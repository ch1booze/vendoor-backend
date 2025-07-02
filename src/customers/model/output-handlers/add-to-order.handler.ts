import { AxiosInstance } from 'axios';
import { Groq as LlamaIndexGroq } from '@llamaindex/groq';

export const addToOrderHandler = async (params: {
  businessId: string;
  payload: Record<string, any>;
  axios: AxiosInstance;
  llm: LlamaIndexGroq;
}) => {
  const { businessId, payload, axios, llm } = params;

  const httpResponse = await axios({ method: 'GET' , url: `businesses/`});
};
