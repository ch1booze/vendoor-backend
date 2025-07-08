import axios from 'axios';
import { RequestConfig } from './types';

export async function axiosRequest(config: RequestConfig) {
  try {
    const response = await axios(config);
    return response?.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Request failed: ${error.message}`);
    } else {
      throw new Error('Request failed with an unknown error');
    }
  }
}
