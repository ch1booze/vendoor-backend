import { AxiosInstance } from 'axios';
import { CustomerIntent } from './intents';
import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { browseProductsHandler } from './output-handlers/browse-products.handler';

export type OutputHandler = (params: {
  businessId: string;
  payload: Record<string, any>;
  axios: AxiosInstance;
  llm: LlamaIndexGroq;
}) => Promise<string>;

export const outputEventHandlers: Record<CustomerIntent, OutputHandler> = {
  [CustomerIntent.BROWSE_PRODUCTS]: browseProductsHandler,
};
