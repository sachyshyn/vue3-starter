import axios, { type AxiosInstance } from 'axios';

export function createHttpApi(baseURL: string = '/'): AxiosInstance {
  return axios.create({ baseURL });
}
