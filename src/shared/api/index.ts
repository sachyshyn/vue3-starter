import { APP_API_URL } from '../config';
import { createHttpApi } from './http';

export const httpApi = createHttpApi(APP_API_URL);
