import type { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosProgressEvent, InternalAxiosRequestConfig } from 'axios';
import { HttpMethod, ContentType, RequestStatus, CancelReason, BusinessStatusMessage } from './enum';
import type { AxiosRequestHeaders } from 'axios'; // 引入 AxiosRequestHeaders 类型

/** 基础响应结构 */
export interface BaseResponse<T = any> {
  code: keyof typeof BusinessStatusMessage | number;
  data: T;
  message?: string;
  [key: string]: any;
}

/** 扩展的请求配置 */
export interface RequestConfig<T = any> extends AxiosRequestConfig {
  loading?: boolean;
  showError?: boolean;
  showSuccess?: boolean;
  successMessage?: string;
  errorMessage?: string;
  contentType?: ContentType;
  withToken?: boolean;
  retry?: number;
  retryDelay?: number;
  requestKey?: string; // 用于取消请求的key
  transformResponse?: (data: T) => any;
}

/** 扩展的响应结构 */
export interface RequestResponse<T = any> extends AxiosResponse<BaseResponse<T>> {
  config: RequestConfig<T> & {
    headers: AxiosRequestHeaders; // 明确 headers 类型，避免 undefined
  };
}

/** 自定义错误对象 */
export interface RequestError<T = any> extends AxiosError<BaseResponse<T>> {
  config?: RequestConfig<T> & InternalAxiosRequestConfig;
  isBusinessError: boolean;
  requestStatus?: RequestStatus; // 使用新属性名避免冲突
  reason?: CancelReason;
}

/** 分页请求参数 */
export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
  [key: string]: any;
}

/** 分页响应数据 */
export interface PageResult<T = any> {
  list: T[];
  total: number;
  page: number;
  size: number;
}

/** 文件上传参数 */
export interface UploadFileParams {
  file: File;
  fieldName?: string;
  data?: Record<string, any>;
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
}