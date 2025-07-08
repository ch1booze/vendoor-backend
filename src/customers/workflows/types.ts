import { Method } from 'axios';

export enum CustomerIntent {
  // Products
  BROWSE_PRODUCTS = 'browse_products',

  // Orders
  ADD_TO_ORDER = 'add_to_order',
  REMOVE_FROM_ORDER = 'remove_from_order',
  ORDER_SUMMARY = 'order_summary',
  PLACE_ORDER = 'place_order',
  CANCEL_ORDER = 'cancel_order',

  // Payments
  SEND_PAYMENT_PROOF = 'send_payment_proof',

  // Delivery
  CHECK_DELIVERY_STATUS = 'check_delivery_status',
  SET_DELIVERY_DETAILS = 'set_delivery_details',

  // Info
  ASK_BUSINESS_INFO = 'ask_business_info',
  FEEDBACK = 'feedback',
  ASK_HUMAN = 'ask_human',

  // Others
  UNKNOWN = 'unknown',
}

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

export class ReplyEventPayload {
  query: string;
  reply: string;
}
