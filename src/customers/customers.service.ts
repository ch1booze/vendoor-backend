import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerChatBody, CreateCustomerBody } from './customers.types';
import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { ConfigService } from '@nestjs/config';
import {
  createStatefulMiddleware,
  createWorkflow,
  Workflow,
} from '@llamaindex/workflow';
import { HttpService } from '@nestjs/axios';

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
      model: this.configService.get('GROQ_LLAMAINDEX_MODEL'),
    });
    const { withState, getContext } = createStatefulMiddleware(() => ({
      intent: undefined,
    }));
    this.workflow = withState(createWorkflow());
  }

  async createCustomer(body: CreateCustomerBody) {
    return await this.prisma.customer.create({ data: body });
  }

  async createCustomerChat(customerId: string, body: CreateCustomerChatBody) {
    const { businessId, query } = body;
    const reply = await this.runWorkflow(businessId, query);
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

  private async runWorkflow(businessId: string, query: string) {
    const { sendEvent, stream } = this.workflow.createContext();
    sendEvent(intentEvent.with({ query }));

    for await (const event of stream) {
      if (replyEvent.include(event)) {
        return event.data.reply;
      }
    }
  }
}
