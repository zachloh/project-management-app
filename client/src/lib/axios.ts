import axios from 'axios';

import { API_URL } from 'config/env';

export const customAxios = axios.create({
  baseURL: API_URL,
});
