import { AxiosInstance } from 'axios';
import { ContextEvent, CustomerIntent } from './intents';
import { WorkflowEventData } from '@llamaindex/workflow';
import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { browseProductsHandler } from './handlers/products.handlers';

export type DataHandler = (params: {
  businessId: string;
  event: WorkflowEventData<ContextEvent>;
  axios: AxiosInstance;
  llm: LlamaIndexGroq;
}) => Promise<string>;

export const DataEvents: Record<CustomerIntent, DataHandler> = {
  [CustomerIntent.BROWSE_PRODUCTS]: browseProductsHandler,
};
