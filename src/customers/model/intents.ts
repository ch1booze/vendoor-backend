export enum CustomerIntent {
  // Products
  BROWSE_PRODUCTS = 'browse_products',
  SEARCH_PRODUCT = 'search_product',

  // Orders
  ADD_TO_ORDER = 'add_to_order',
  UPDATE_ORDER = 'update_order',
  REMOVE_FROM_ORDER = 'remove_from_order',
  ORDER_SUMMARY = 'order_summary',
  PLACE_ORDER = 'place_order',
  CANCEL_ORDER = 'cancel_order',

  // Invoice
  INVOICE_STATUS = 'invoice_status',
  REQUEST_INVOICE = 'request_invoice',

  // Payments
  PAYMENT_METHODS = 'payment_methods',
  SEND_PAYMENT_PROOF = 'send_payment_proof',

  // Delivery
  CHECK_DELIVERY_STATUS = 'check_delivery_status',
  SET_DELIVERY_DETAILS = 'set_delivery_details',
  SCHEDULE_DELIVERY = 'schedule_delivery',

  // Info
  ASK_BUSINESS_INFO = 'ask_business_info',
  WORKING_HOURS = 'working_hours',
  COMPLAINT = 'complaint',
  FEEDBACK = 'feedback',
  ASK_HUMAN = 'ask_human',

  // Others
  START_OVER = 'start_over',
  GREETING = 'greeting',
  THANK_YOU = 'thank_you',
  GOODBYE = 'goodbye',
  UNKNOWN = 'unknown',
}

export class InputEvent {
  query: string;
}

export class ContextEvent {
  query: string;
  intent: CustomerIntent;
}

export class OutputEvent {
  query: string;
  intent: CustomerIntent;
  context: object;
}

export class ReplyEvent {
  reply: string;
}
