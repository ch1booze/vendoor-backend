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

export const intentExplanations: Record<CustomerIntent, string> = {
  [CustomerIntent.BROWSE_PRODUCTS]:
    'The user wants to look through the available products.',
  [CustomerIntent.ADD_TO_ORDER]:
    'The user wants to add an item to their order.',
  [CustomerIntent.REMOVE_FROM_ORDER]:
    'The user wants to remove an item from their order.',
  [CustomerIntent.ORDER_SUMMARY]:
    'The user wants to see a summary of their current order.',
  [CustomerIntent.PLACE_ORDER]:
    'The user wants to finalize and place their order.',
  [CustomerIntent.CANCEL_ORDER]: 'The user wants to cancel an existing order.',
  [CustomerIntent.SEND_PAYMENT_PROOF]:
    'The user wants to submit proof of payment.',
  [CustomerIntent.CHECK_DELIVERY_STATUS]:
    'The user wants to know the status of their delivery.',
  [CustomerIntent.SET_DELIVERY_DETAILS]:
    'The user wants to provide or update their delivery details.',
  [CustomerIntent.ASK_BUSINESS_INFO]:
    'The user wants general information about the business.',
  [CustomerIntent.FEEDBACK]:
    'The user wants to provide feedback about the service.',
  [CustomerIntent.ASK_HUMAN]:
    'The user wants to speak with a human representative.',
  [CustomerIntent.UNKNOWN]: "The user's request is unclear or not recognized.",
};

const generateIntentExplanations = (): string => {
  return Object.entries(intentExplanations)
    .map(([intent, explanation]) => `${intent}: ${explanation}`)
    .join('\n');
};

export const intentClassificationPrompt: string = `You are an intent classification assistant. Your task is to analyze the user's query and determine the intent behind it. You have been given a query, and you need to extract the intent based on the predefined list of possible intents.

Here is the list of possible intents with simple explanations:

${generateIntentExplanations()}

Analyze the query and return ONLY a JSON object with the following structure. Do not add any explanatory text.

{
  "intent": "string"
}`;
