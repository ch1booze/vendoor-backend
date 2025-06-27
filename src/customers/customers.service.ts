import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerChatDto, CreateCustomerDto } from './customers.dto';
import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { ConfigService } from '@nestjs/config';
import { createWorkflow, Workflow, workflowEvent } from '@llamaindex/workflow';
import { HttpService } from '@nestjs/axios';
import {
  ContextEvent,
  CustomerIntent,
  InputEvent,
  OutputEvent,
  ReplyEvent,
} from './model/intents';
import { intentExtractionPrompt } from './model/intent-explanations';
import { intentPrompts } from './model/intent-prompts';
import { outputHandlers } from './model/output-handlers';

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
    const { businessId, query } = dto;
    const reply = await this.runWorkflow(customerId, businessId, query);
    if (reply) {
      return await this.prisma.customerChat.create({
        data: {
          customerId,
          businessId: dto.businessId,
          query: dto.query,
          reply,
        },
      });
    }
  }

  async getCustomerChats(customerId: string, businessId: string) {
    return await this.prisma.customerChat.findMany({
      where: { customerId, businessId },
    });
  }

  private async runWorkflow(
    customerId: string,
    businessId: string,
    query: string,
  ) {
    const inputEvent = workflowEvent<InputEvent>();
    const contextEvent = workflowEvent<ContextEvent>();
    const outputEvent = workflowEvent<OutputEvent>();
    const replyEvent = workflowEvent<ReplyEvent>();

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

      return contextEvent.with({
        query: event.data.query,
        intent: responseJson.intent,
      });
    });

    this.workflow.handle([contextEvent], async (event) => {
      const response = await this.llm.chat({
        messages: [
          { role: 'system', content: intentPrompts[event.data.intent] },
          { role: 'user', content: event.data.query },
        ],
        responseFormat: { type: 'json_object' },
      });

      const responseJson = JSON.parse(
        response.message.content as string,
      ) as object;

      return outputEvent.with({
        query: event.data.query,
        intent: event.data.intent,
        context: responseJson,
      });
    });

    this.workflow.handle([outputEvent], async (event) => {
      const reply = await outputHandlers[event.data.intent]({
        businessId,
        axios: this.httpService.axiosRef,
        llm: this.llm,
        event,
      });

      return replyEvent.with({ reply });
    });

    const { sendEvent, stream } = this.workflow.createContext();
    sendEvent(inputEvent.with({ query }));

    for await (const event of stream) {
      if (replyEvent.include(event)) {
        return event.data.reply;
      }
    }
  }
}
