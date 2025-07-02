import { Prompts } from '../customers.types';
import { CustomerIntent } from './intents';

export const replyPrompts: Prompts = {
  [CustomerIntent.BROWSE_PRODUCTS]: `You are a helpful assistant for a business.
  The input is a JSON object containing a list of products or services offered by the business that the user can browse.
  Generate a friendly, clear message listing these products so the user can choose what interests them. Output ONLY a plain text message.`,
};
