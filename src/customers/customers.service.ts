import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCustomerChatDto,
  CreateCustomerDto,
  REPLY_GENERATION_PROMPT,
} from './customers.dto';
import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { ConfigService } from '@nestjs/config';
import { createWorkflow, Workflow, workflowEvent } from '@llamaindex/workflow';
import { HttpService } from '@nestjs/axios';
import {
  CustomerIntent,
  intentExtractionPrompt,
  intentPrompts,
} from './customers.intents';

@Injectable()
export class CustomersService {
  private readonly llm: LlamaIndexGroq;
  private readonly workflow: Workflow;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.llm = new LlamaIndexGroq({
      apiKey: this.configService.get('GROQ_API_KEY'),
    });
    this.workflow = createWorkflow();
  }

  async createCustomer(dto: CreateCustomerDto) {
    return await this.prisma.customer.create({ data: dto });
  }

  async createCustomerChat(customerId: string, dto: CreateCustomerChatDto) {
    const reply = 'REPLY GOES HERE';
    return await this.prisma.customerChat.create({
      data: { customerId, businessId: dto.businessId, query: dto.query, reply },
    });
  }

  async getCustomerChats(customerId: string) {
    return await this.prisma.customerChat.findMany({ where: { customerId } });
  }

  private async runWorkflow(query: string) {
    const inputEvent = workflowEvent<{ query: string }>();
    const generateEvent = workflowEvent<{
      query: string;
      intent: CustomerIntent;
    }>();
    const outputEvent = workflowEvent<{
      query: string;
      intent: CustomerIntent;
      reply: string;
    }>();

    this.workflow.handle([inputEvent], async (event) => {
      const response = await this.llm.chat({
        messages: [
          { role: 'system', content: intentExtractionPrompt },
          { role: 'user', content: event.data.query },
        ],
        responseFormat: { type: 'json_object' },
      });

      const responseJson = JSON.parse(response.message.content as string) as {
        intent: CustomerIntent;
      };

      return generateEvent.with({
        query: event.data.query,
        intent: responseJson.intent,
      });
    });

    this.workflow.handle([generateEvent], async (event) => {
      const response = await this.llm.chat({
        messages: [
          { role: 'system', content: intentPrompts[event.data.intent] },
          { role: 'user', content: event.data.query },
        ],
        responseFormat: { type: 'json_object' },
      });

      const responseJson = JSON.parse(response.message.content as string) as {
        reply: string;
      };

      return outputEvent.with({
        query: event.data.query,
        intent: event.data.intent,
        reply: responseJson.reply,
      });
    });

    this.workflow.handle([outputEvent], async (event) => {
      await this.createCustomerChat(event.data.customerId, {
        query: event.data.query,
        reply: event.data.reply,
      });
    });

    const { sendEvent, stream } = this.workflow.createContext();
    sendEvent(inputEvent.with({ query }));
    let result:
      | { query: string; intent: CustomerIntent; reply: string }
      | undefined;

    for await (const event of stream) {
      if (outputEvent.include(event)) {
        result = event.data;
        return result;
      }
    }
  }
}
