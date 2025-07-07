import { Method } from 'axios';
import { CustomerIntent } from './intents';

export class RequestConfig {
  url: string;
  method: Method;
  data?: object;
  params?: object;
}

export class IntentEventPayload {
  query: string;
}

export class LlmCallEventPayload {
  query: string;
  intent: CustomerIntent;
  context?: object;
}

export class ApiCallEventPayload {
  query: string;
  intent: CustomerIntent;
  request: RequestConfig;
}

export class ReplyEventPayload {
  query: string;
  reply: string;
}
