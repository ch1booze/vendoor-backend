export enum CustomerIntent {
  // Products
  BROWSE_PRODUCTS = 'browse_products',
  SEARCH_PRODUCT = 'search_product',
  PRODUCT_DETAILS = 'product_details',

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

export type IntentPrompts = Record<CustomerIntent, string>;

const intentExplanations: Record<CustomerIntent, string> = {
  [CustomerIntent.BROWSE_PRODUCTS]:
    'The user wants to look through the available products.',
  [CustomerIntent.SEARCH_PRODUCT]:
    'The user is searching for a specific product.',
  [CustomerIntent.PRODUCT_DETAILS]:
    'The user wants detailed information about a specific product.',
  [CustomerIntent.ADD_TO_ORDER]:
    'The user wants to add an item to their order.',
  [CustomerIntent.UPDATE_ORDER]:
    'The user wants to change the quantity of an item in their order.',
  [CustomerIntent.REMOVE_FROM_ORDER]:
    'The user wants to remove an item from their order.',
  [CustomerIntent.ORDER_SUMMARY]:
    'The user wants to see a summary of their current order.',
  [CustomerIntent.PLACE_ORDER]:
    'The user wants to finalize and place their order.',
  [CustomerIntent.CANCEL_ORDER]: 'The user wants to cancel an existing order.',
  [CustomerIntent.INVOICE_STATUS]:
    'The user wants to know the status of an invoice.',
  [CustomerIntent.REQUEST_INVOICE]: 'The user wants a copy of their invoice.',
  [CustomerIntent.PAYMENT_METHODS]:
    'The user wants to know the available payment methods.',
  [CustomerIntent.SEND_PAYMENT_PROOF]:
    'The user wants to submit proof of payment.',
  [CustomerIntent.CHECK_DELIVERY_STATUS]:
    'The user wants to know the status of their delivery.',
  [CustomerIntent.SET_DELIVERY_DETAILS]:
    'The user wants to provide or update their delivery details.',
  [CustomerIntent.SCHEDULE_DELIVERY]:
    'The user wants to schedule or reschedule their delivery.',
  [CustomerIntent.ASK_BUSINESS_INFO]:
    'The user wants general information about the business.',
  [CustomerIntent.WORKING_HOURS]:
    'The user wants to know the business or support operating hours.',
  [CustomerIntent.COMPLAINT]: 'The user wants to make a complaint.',
  [CustomerIntent.FEEDBACK]: 'The user wants to provide feedback.',
  [CustomerIntent.ASK_HUMAN]: 'The user wants to speak with a human agent.',
  [CustomerIntent.START_OVER]: 'The user wants to restart the conversation.',
  [CustomerIntent.GREETING]: 'The user is greeting the assistant.',
  [CustomerIntent.THANK_YOU]: 'The user is expressing gratitude.',
  [CustomerIntent.GOODBYE]: 'The user is ending the conversation.',
  [CustomerIntent.UNKNOWN]: "The user's request is unclear or not recognized.",
};

const generateIntentExplanations = (): string => {
  return Object.entries(intentExplanations)
    .map(([intent, explanation]) => `${intent}: ${explanation}`)
    .join('\n');
};

export const intentExtractionPrompt: string = `You are an intent classification assistant. Your task is to analyze the user's query and determine the intent behind it. You have been given a query, and you need to extract the intent based on the predefined list of possible intents.

Here is the list of possible intents with simple explanations:

${generateIntentExplanations()}

Analyze the query and return ONLY a JSON object with the following structure. Do not add any explanatory text.

{
  "intent": "string"
}`;

export const intentPrompts: IntentPrompts = {
  [CustomerIntent.BROWSE_PRODUCTS]:
    'You are a helpful shopping assistant. The user wants to browse the product catalog. Your goal is to guide them, perhaps by suggesting product categories or asking what type of items they are interested in. Do not ask for specific product names yet.',
  [CustomerIntent.SEARCH_PRODUCT]: `You are a product search assistant. The user wants to find a specific product. Extract search terms, filters, and sorting preferences from the user's query. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "query": "string | null",
  "filters": {
    "category": "string | null",
    "price_min": "number | null",
    "price_max": "number | null"
  },
  "sort_by": "'price_asc' | 'price_desc' | 'relevance' | 'newest' | null"
}`,
  [CustomerIntent.PRODUCT_DETAILS]: `You are a product information assistant. The user is asking for details about a specific product. Identify the product they are asking about by its name or ID. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "product_identifier": "string"
}`,
  [CustomerIntent.ADD_TO_ORDER]: `You are an order management assistant. The user wants to add one or more items to their current order. Extract the product identifier and the quantity. If quantity is not mentioned, default to 1. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "product_identifier": "string",
  "quantity": "number"
}`,
  [CustomerIntent.UPDATE_ORDER]: `You are an order management assistant. The user wants to change the quantity of an item in their current order. Extract the product to be updated and the new quantity. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "product_identifier": "string",
  "new_quantity": "number"
}`,
  [CustomerIntent.REMOVE_FROM_ORDER]: `You are an order management assistant. The user wants to remove an item from their current order. Extract the product identifier of the item to be removed. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "product_identifier": "string"
}`,
  [CustomerIntent.ORDER_SUMMARY]:
    "You are an order management assistant. The user is asking to see a summary of their current order (i.e., what's in their cart). Acknowledge the request and prepare to display the order summary. No data extraction is needed.",
  [CustomerIntent.PLACE_ORDER]:
    'You are an order processing assistant. The user wants to finalize and place their order. Confirm their intent to proceed with the payment and delivery process. This is the final step before payment.',
  [CustomerIntent.CANCEL_ORDER]: `You are an order management assistant. The user wants to cancel an existing order. Extract the order identifier they provide. If no identifier is given, ask for it. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "order_id": "string | null"
}`,
  [CustomerIntent.INVOICE_STATUS]: `You are a billing assistant. The user is asking about the status of an invoice (e.g., 'is it paid?'). Extract the invoice or order number. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "identifier": "string"
}`,
  [CustomerIntent.REQUEST_INVOICE]: `You are a billing assistant. The user wants a copy of their invoice. Extract the invoice or order number. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "identifier": "string"
}`,
  [CustomerIntent.PAYMENT_METHODS]:
    'You are a helpful assistant. The user is asking about the available payment methods. Your task is to provide a clear and concise list of all accepted payment options (e.g., Credit Card, PayPal, Bank Transfer).',
  [CustomerIntent.SEND_PAYMENT_PROOF]:
    'You are a billing assistant. The user wants to submit proof of payment. Guide the user on how to do this, for example, by asking them to upload a file (photo or PDF) of their receipt or transaction confirmation.',
  [CustomerIntent.CHECK_DELIVERY_STATUS]: `You are a logistics assistant. The user wants to know the status of their delivery. Extract the order ID or tracking number from their request. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "tracking_identifier": "string"
}`,
  [CustomerIntent.SET_DELIVERY_DETAILS]: `You are a logistics assistant. The user wants to provide or update their delivery address and contact information. Extract all relevant details. Return ONLY a JSON object with the following structure, filling in null for any missing information. Do not add any explanatory text.
{
  "address": {
    "street": "string | null",
    "city": "string | null",
    "state_province": "string | null",
    "postal_code": "string | null",
    "country": "string | null"
  },
  "contact_name": "string | null",
  "contact_phone": "string | null",
  "delivery_instructions": "string | null"
}`,
  [CustomerIntent.SCHEDULE_DELIVERY]: `You are a logistics assistant. The user wants to schedule or reschedule their delivery. Extract the order ID (if mentioned) and the preferred date and time. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "order_id": "string | null",
  "preferred_date": "string | null",
  "preferred_time_window": "string | null"
}`,
  [CustomerIntent.ASK_BUSINESS_INFO]:
    "You are a helpful company representative. The user is asking for general information about the business (e.g., 'What do you sell?', 'Where are you located?'). Provide accurate and helpful information about the company.",
  [CustomerIntent.WORKING_HOURS]:
    'You are a helpful assistant. The user is asking about business or support operating hours. Provide the correct schedule, including any details about weekends or holidays.',
  [CustomerIntent.COMPLAINT]: `You are a customer support agent. The user is making a complaint. Handle the situation with empathy. Extract the key details of the complaint to help resolve it. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "subject": "string",
  "related_identifier": "string | null",
  "details": "string"
}`,
  [CustomerIntent.FEEDBACK]: `You are a customer support agent. The user is providing feedback. Extract the details of their feedback and classify its sentiment. Return ONLY a JSON object with the following structure. Do not add any explanatory text.
{
  "feedback_type": "'positive' | 'negative' | 'neutral' | 'suggestion'",
  "subject": "string | null",
  "details": "string"
}`,
  [CustomerIntent.ASK_HUMAN]:
    'You are a chatbot assistant. The user has explicitly asked to speak with a human agent. Acknowledge this request and initiate the process for handoff to a human. Do not try to solve the problem yourself.',
  [CustomerIntent.START_OVER]:
    "You are a chatbot assistant. The user wants to restart the conversation. Acknowledge this and reset the context, preparing to start a fresh interaction. Greet them as if it's the beginning of a new conversation.",
  [CustomerIntent.GREETING]:
    'You are a friendly and professional assistant. The user has initiated the conversation with a greeting. Respond with a warm and welcoming message, and ask how you can help.',
  [CustomerIntent.THANK_YOU]:
    'You are a polite assistant. The user is expressing gratitude. Respond graciously and let them know you are happy to help. Ask if there is anything else they need.',
  [CustomerIntent.GOODBYE]:
    'You are a polite assistant. The user is ending the conversation. Respond with a polite closing remark and wish them a good day.',
  [CustomerIntent.UNKNOWN]:
    "You are a helpful assistant. The user's request is unclear or falls outside of your known capabilities. Apologize for not understanding and clearly state what you can help with (e.g., 'I can help you search for products, check order status, or file a complaint.').",
};

export const intentHandlers = {
  [CustomerIntent.BROWSE_PRODUCTS]: {
    route: (businessId: string) => {
      return `/businesses/${businessId}/products`;
    },
  },
};
