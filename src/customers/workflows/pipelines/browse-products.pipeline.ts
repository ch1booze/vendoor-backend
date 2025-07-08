import { DirectedGraph } from 'graphology';
import { GetProductsQuery } from 'src/products/products.types';
import { getClassProps } from 'src/utils';

export const browseProductsPipeline = new DirectedGraph();

browseProductsPipeline.addNode('START', {
  prompt: `
  A user has entered a query and it has been determined that the user is interested in knowing what products or services a business offers.
  You are to make an API call via Axios to fetch products and/or services offered by the business.
  You are to return a JSON object containing the payload to be passed as an Axios RequestConfig object:
  Below is the way the payload should be structured:
  {
    method: 'GET',
    url: '/businesses/<businessId>/products',
    params: ${JSON.stringify(getClassProps(GetProductsQuery))}
  }

  Extract the params from the user's query and use them to construct the payload.
  `,
});

browseProductsPipeline.addNode('END', {
  prompt: `
  A request has been made to the API endpoint '/businesses/<businessId>/products' with the following payload:
  {
    method: 'GET',
    url: '/businesses/<businessId>/products',
    params: ${JSON.stringify(getClassProps(GetProductsQuery))}
  } to retrieve the products and/or services offered by the business.

  You are to take all the products and/or services offered by the business and construct a reply to the user's query.
  The structure of the JSON object to be returned should be as follows:
  {
    reply: string
  }
    `,
});

browseProductsPipeline.addDirectedEdge('START', 'END');
