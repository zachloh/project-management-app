/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from 'config/env';
import storage from 'utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const customAxios = axios.create({
  baseURL: API_URL,
});

customAxios.interceptors.request.use(authRequestInterceptor);
