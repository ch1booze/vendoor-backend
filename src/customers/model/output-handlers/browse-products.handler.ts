import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { AxiosInstance } from 'axios';
import { CustomerIntent } from '../intents';
import { replyPrompts } from '../reply-prompts';

export const browseProductsHandler = async (params: {
  businessId: string;
  payload: Record<string, any>;
  axios: AxiosInstance;
  llm: LlamaIndexGroq;
}) => {
  const { businessId, payload, axios, llm } = params;
  const httpResponse = await axios({
    method: 'GET',
    url: `/businesses/${businessId}/products`,
    params: payload.query as object,
  });

  const llmResponse = await llm.chat({
    messages: [
      { role: 'system', content: replyPrompts[CustomerIntent.BROWSE_PRODUCTS] },
      {
        role: 'user',
        content: `Here are the products:
        ${JSON.stringify(httpResponse.data)}`,
      },
    ],
  });

  return llmResponse.message.content as string;
};
