import { Groq as LlamaIndexGroq } from '@llamaindex/groq';
import { WorkflowEventData } from '@llamaindex/workflow';
import { AxiosInstance } from 'axios';
import { ContextEvent, CustomerIntent } from '../intents';
import { replyPrompts } from '../reply-prompts';

export const browseProductsHandler = async (params: {
  businessId: string;
  event: WorkflowEventData<ContextEvent>;
  axios: AxiosInstance;
  llm: LlamaIndexGroq;
}) => {
  const { businessId, event, axios, llm } = params;
  const httpResponse = await axios({
    method: 'GET',
    url: `/businesses/${businessId}/products`,
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
