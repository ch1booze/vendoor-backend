import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerChatBody, CreateCustomerBody } from './customers.types';
import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { ConfigService } from '@nestjs/config';
import { createWorkflow, Workflow, workflowEvent } from '@llamaindex/workflow';
import { HttpService } from '@nestjs/axios';
import {
  ContextEventPayload,
  CustomerIntent,
  RequestEventPayload,
  intentExtractionPrompt,
  OutputEventPayload,
  ReplyEventPayload,
} from './model/intents';
import { contextPrompts } from './model/context-prompts';
import { outputEventHandlers } from './model/output-handlers';

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

  async createCustomer(body: CreateCustomerBody) {
    return await this.prisma.customer.create({ data: body });
  }

  async createCustomerChat(customerId: string, body: CreateCustomerChatBody) {
    const { businessId, query } = body;
    const reply = await this.runWorkflow(customerId, businessId, query);
    if (reply) {
      return await this.prisma.customerChat.create({
        data: {
          customerId,
          businessId: body.businessId,
          query: body.query,
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
    const requestEvent = workflowEvent<RequestEventPayload>();
    const contextEvent = workflowEvent<ContextEventPayload>();
    const outputEvent = workflowEvent<OutputEventPayload>();
    const replyEvent = workflowEvent<ReplyEventPayload>();

    this.workflow.handle([requestEvent], async (event) => {
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
          { role: 'system', content: contextPrompts[event.data.intent] },
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
      const reply = await outputEventHandlers[event.data.intent]({
        businessId,
        axios: this.httpService.axiosRef,
        llm: this.llm,
        payload: event.data.context,
      });

      return replyEvent.with({ reply });
    });

    const { sendEvent, stream } = this.workflow.createContext();
    sendEvent(requestEvent.with({ query }));

    for await (const event of stream) {
      if (replyEvent.include(event)) {
        return event.data.reply;
      }
    }
  }
}
