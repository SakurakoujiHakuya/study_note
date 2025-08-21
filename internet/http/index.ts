import axios, { AxiosRequestConfig, CancelTokenSource, AxiosResponse, AxiosProgressEvent  } from 'axios';
import { DEFAULT_CONFIG } from './config';
import {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor
} from './interceptors';
import type { BaseResponse, RequestConfig, RequestError, RequestResponse, UploadFileParams } from './types';
import { RequestStatus, CancelReason, ContentType, HttpMethod } from './enum';

class HttpService {
  private instance;
  private cancelTokenMap: Map<string, CancelTokenSource>;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.cancelTokenMap = new Map();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(requestInterceptor, errorInterceptor);
    
    // 响应拦截
    this.instance.interceptors.response.use(
      responseInterceptor,
      error => errorInterceptor(error as RequestError)
    );
  }

  /** 创建取消令牌 */
  private createCancelToken(key: string) {
    this.cancelRequest(key); // 取消之前的同key请求
    const source = axios.CancelToken.source();
    this.cancelTokenMap.set(key, source);
    return source.token;
  }

  /** 取消请求 */
  public cancelRequest(key: string = 'default', reason: CancelReason = CancelReason.MANUAL_CANCEL) {
    const source = this.cancelTokenMap.get(key);
    if (source) {
      source.cancel(reason);
      this.cancelTokenMap.delete(key);
    }
  }

  /** 核心请求方法 */
  public async request<T = any>(config: RequestConfig<T>): Promise<T> {
    const requestKey = config.requestKey || 'default';
    const mergedConfig: RequestConfig = {
      ...DEFAULT_CONFIG,
      ...config,
      cancelToken: this.createCancelToken(requestKey)
    };

    try {
      // const response = await (this.instance.request(mergedConfig) as Promise<AxiosResponse<BaseResponse<T>>>);
      const response = await (this.instance.request(mergedConfig));
      return response;
      // console.log(response);
      
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`Request canceled: ${error.message}`);
      }
      throw error;
    } finally {
      this.cancelTokenMap.delete(requestKey);
    }
  }

  /** GET请求 */
  public get<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: HttpMethod.GET, url });
  }

  /** POST请求 */
  public post<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: HttpMethod.POST, url, data });
  }

  /** PUT请求 */
  public put<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: HttpMethod.PUT, url, data });
  }

  /** DELETE请求 */
  public delete<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: HttpMethod.DELETE, url });
  }

  /** 上传文件 */
  public upload<T = any>(url: string, params: UploadFileParams, config?: RequestConfig<T>): Promise<T> {
  const formData = new FormData();
  formData.append(params.fieldName || 'file', params.file);
  
  const { data } = params;
  if (data && typeof data === 'object') {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
  }

  // 适配 progress 回调
  const onUploadProgress = params.onProgress
    ? (progressEvent: AxiosProgressEvent) => params.onProgress!(progressEvent)
    : undefined;

  return this.post(url, formData, {
    ...config,
    contentType: ContentType.MULTIPART,
    onUploadProgress
  });
}
}

export const http = new HttpService(DEFAULT_CONFIG);