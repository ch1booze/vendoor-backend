import { Prompts } from '../customers.dto';
import { CustomerIntent } from './intents';

export const intentPrompts: Prompts = {
  [CustomerIntent.BROWSE_PRODUCTS]: `You are a helpful shopping assistant. The user wants to browse the product catalog. Your goal is to guide them, perhaps by suggesting product categories or asking what type of items they are interested in. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "acknowledgement": "string"
}`,

  [CustomerIntent.SEARCH_PRODUCT]: `You are a product search assistant. The user wants to find a specific product. Extract search terms, filters, and sorting preferences from the user's query. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "query": "string | null",
  "filters": {
    "category": "string | null",
    "price_min": "number | null",
    "price_max": "number | null"
  },
  "sort_by": "'price_asc' | 'price_desc' | 'relevance' | 'newest' | null"
}`,

  [CustomerIntent.ADD_TO_ORDER]: `You are an order management assistant. The user wants to add one or more items to their current order. Extract the product identifier and the quantity. If quantity is not mentioned, default to 1. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "product_identifier": "string",
  "quantity": "number"
}`,

  [CustomerIntent.UPDATE_ORDER]: `You are an order management assistant. The user wants to change the quantity of an item in their current order. Extract the product to be updated and the new quantity. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "product_identifier": "string",
  "new_quantity": "number"
}`,

  [CustomerIntent.REMOVE_FROM_ORDER]: `You are an order management assistant. The user wants to remove an item from their current order. Extract the product identifier of the item to be removed. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "product_identifier": "string"
}`,

  [CustomerIntent.ORDER_SUMMARY]: `You are an order management assistant. The user is asking to see a summary of their current order. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "acknowledgement": "string"
}`,

  [CustomerIntent.PLACE_ORDER]: `You are an order processing assistant. The user wants to finalize and place their order. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "confirmation": "string"
}`,

  [CustomerIntent.CANCEL_ORDER]: `You are an order management assistant. The user wants to cancel an existing order. Extract the order identifier if provided. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "order_id": "string | null"
}`,

  [CustomerIntent.INVOICE_STATUS]: `You are a billing assistant. The user is asking about the status of an invoice. Extract the invoice or order number. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "identifier": "string"
}`,

  [CustomerIntent.REQUEST_INVOICE]: `You are a billing assistant. The user wants a copy of their invoice. Extract the invoice or order number. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "identifier": "string"
}`,

  [CustomerIntent.PAYMENT_METHODS]: `You are a helpful assistant. The user is asking about the available payment methods. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "payment_methods": ["string"]
}`,

  [CustomerIntent.SEND_PAYMENT_PROOF]: `You are a billing assistant. The user wants to submit proof of payment. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "acknowledgement": "string",
  "instructions": "string"
}`,

  [CustomerIntent.CHECK_DELIVERY_STATUS]: `You are a logistics assistant. The user wants to know the status of their delivery. Extract the order ID or tracking number. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "tracking_identifier": "string"
}`,

  [CustomerIntent.SET_DELIVERY_DETAILS]: `You are a logistics assistant. The user wants to provide or update their delivery address and contact information. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
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

  [CustomerIntent.SCHEDULE_DELIVERY]: `You are a logistics assistant. The user wants to schedule or reschedule their delivery. Extract the order ID if mentioned and the preferred date and time. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "order_id": "string | null",
  "preferred_date": "string | null",
  "preferred_time_window": "string | null"
}`,

  [CustomerIntent.ASK_BUSINESS_INFO]: `You are a helpful company representative. The user is asking for general information about the business. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "business_info": "string"
}`,

  [CustomerIntent.WORKING_HOURS]: `You are a helpful assistant. The user is asking about business or support operating hours. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "working_hours": "string"
}`,

  [CustomerIntent.COMPLAINT]: `You are a customer support agent. The user is making a complaint. Extract the key details. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "subject": "string",
  "related_identifier": "string | null",
  "details": "string"
}`,

  [CustomerIntent.FEEDBACK]: `You are a customer support agent. The user is providing feedback. Extract the details and classify the sentiment. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "feedback_type": "'positive' | 'negative' | 'neutral' | 'suggestion'",
  "subject": "string | null",
  "details": "string"
}`,

  [CustomerIntent.ASK_HUMAN]: `You are a chatbot assistant. The user has explicitly asked to speak with a human agent. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "acknowledgement": "string"
}`,

  [CustomerIntent.START_OVER]: `You are a chatbot assistant. The user wants to restart the conversation. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "acknowledgement": "string"
}`,

  [CustomerIntent.GREETING]: `You are a friendly and professional assistant. The user has initiated the conversation with a greeting. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "greeting": "string"
}`,

  [CustomerIntent.THANK_YOU]: `You are a polite assistant. The user is expressing gratitude. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "acknowledgement": "string"
}`,

  [CustomerIntent.GOODBYE]: `You are a polite assistant. The user is ending the conversation. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "farewell": "string"
}`,

  [CustomerIntent.UNKNOWN]: `You are a helpful assistant. The user's request is unclear or outside your capabilities. Return ONLY a JSON object with the following structure. Do not add any explanatory text or any content outside this JSON.
{
  "acknowledgement": "string",
  "clarification": "string"
}`,
};
