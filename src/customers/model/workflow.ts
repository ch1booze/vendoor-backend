import { groq } from '@llamaindex/groq';
import {
  ApiCallEventPayload,
  IntentEventPayload,
  LlmCallEventPayload,
  ReplyEventPayload,
} from './types';
import { createWorkflow, workflowEvent } from '@llamaindex/workflow';
import { CustomerIntent, intentClassificationPrompt } from './intents';

const llm = groq();

export const intentEvent = workflowEvent<IntentEventPayload>();
export const llmCallEvent = workflowEvent<LlmCallEventPayload>();
export const apiCallEvent = workflowEvent<ApiCallEventPayload>();
export const replyEvent = workflowEvent<ReplyEventPayload>();

const workflow = createWorkflow();

workflow.handle([intentEvent], async (event) => {
  const { query } = event.data;
  const response = await llm.chat({
    messages: [
      { role: 'system', content: intentClassificationPrompt },
      { role: 'user', content: query },
    ],
    responseFormat: { type: 'json_object' },
  });

  const { intent } = JSON.parse(response.message.content as string) as {
    intent: CustomerIntent;
  };

  return llmCallEvent.with({ query, intent });
});

workflow.handle([llmCallEvent], async (event) => {});

workflow.handle([apiCallEvent], async (event) => {});
