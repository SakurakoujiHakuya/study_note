import { ContentType } from './enum'
import { RequestConfig } from './types';
console.log(window);

export const BASE_URL = window.globalvariable.VITE_GLOB_API_URL;

export const DEFAULT_CONFIG: RequestConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': ContentType.JSON,
    'X-Requested-With': 'XMLHttpRequest'
  },
  withToken: true,
  showError: true,
  loading: false,
  retry: 0,
  retryDelay: 1000
};