import { DirectedGraph } from 'graphology';
import { CustomerIntent } from './types';
import { browseProductsPipeline } from './pipelines/browse-products.pipeline';

export const pipelines: Record<string, DirectedGraph> = {
  [CustomerIntent.BROWSE_PRODUCTS]: browseProductsPipeline,
};
