import { APP_API_URL } from '@/shared/config';
import axios, { type AxiosInstance } from 'axios';

export function createHttpService(): AxiosInstance {
  return axios.create({ baseURL: APP_API_URL });
}
