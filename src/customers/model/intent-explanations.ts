import { CustomerIntent } from './intents';

export const intentExplanations: Record<CustomerIntent, string> = {
  [CustomerIntent.BROWSE_PRODUCTS]:
    'The user wants to look through the available products.',
  [CustomerIntent.SEARCH_PRODUCT]:
    'The user is searching for a specific product or products that fit criteria.',
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
