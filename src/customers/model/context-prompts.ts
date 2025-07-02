import { getClassProps, getPrismaModelFields } from 'src/utils';
import { Prompts } from '../customers.types';
import { CustomerIntent } from './intents';
import { GetProductsQuery } from 'src/products/products.types';

export const contextPrompts: Prompts = {
  [CustomerIntent.BROWSE_PRODUCTS]: `You are a helpful assistant. The user wants to browse the product catalog. Propose query parameters to filter the products based on the user's request.
    Here is a JSON object specifying the expected query parameters, their types, and optionality:
    ${JSON.stringify(getClassProps(GetProductsQuery), null, 2)}
    Return ONLY a JSON object in the following structure:
    {
        "query": {
            "parameterName1": value,
            "parameterName2": value
        }
    }`,

  [CustomerIntent.ADD_TO_ORDER]: `You are a helpful assistant. The user wants to add to an existing order or create a new order. Propose invoice items for the order based on the available products or services.
  Here is the format for the JSON object with product or service listings:
  [
  ${JSON.stringify(getPrismaModelFields('Product'))}
  ]
  Return a JSON object in the following structure:
  {
  "invoiceItems": [
    {
        "productId": "string",
        "quantity": number
    }
  ]
  }`,
};
