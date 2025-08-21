import type { RequestConfig, RequestResponse, RequestError } from "./types";
import {
    getStatusMessage,
    HttpStatusMessage,
    RequestStatus,
    CancelReason,
    ContentType,
} from "./enum";
import { clearToken, getToken } from "../utils/auth";
import { showMessage } from "../utils/message";
import axios from "axios";
/** 请求拦截器 */
export function requestInterceptor(config: RequestConfig): RequestConfig {
    // 添加Token
    if (config.withToken !== false) {
        const token = getToken();
        if (token && config.headers) {
            // config.headers.Authorization = token;
            // config.headers['x-access-token'] = token
            config.headers['x-access-token'] = token
        }
    }

    // 处理Content-Type
    if (config.contentType && config.headers) {
        config.headers["Content-Type"] = config.contentType;
    }

    // 处理表单数据
    if (
        config.contentType === ContentType.FORM &&
        config.data &&
        typeof config.data === "object"
    ) {
        config.data = new URLSearchParams(config.data).toString();
    }

    return config;
}

/** 响应拦截器 */
export function responseInterceptor(response: RequestResponse): any {
    const { config, data } = response;

    // 业务成功
    if (data.code === 200 || data.code === 0) {
        if (config.showSuccess) {
            showMessage(
                config.successMessage || data.message || "操作成功",
                "success"
            );
        }
        // return config.transformResponse
        //     ? config.transformResponse(data.data)
        //     : data.data;
        return data.result;
    }

    // 业务错误
    const error: RequestError = {
    ...new Error(data.message),
    config,
    response,
    isBusinessError: true,
    code: String(data.code),
    status: RequestStatus.REJECTED as unknown as number,
    isAxiosError: false,
    cause: undefined,
    toJSON(): object {
        return {
            message: this.message,
            code: this.code,
            status: this.status,
            config: this.config,
            response: this.response,
        };
    },
};
    return Promise.reject(error);
}

/** 错误拦截器 */
export function errorInterceptor(error: RequestError): Promise<never> {
    // 已取消的请求不处理
    if (axios.isCancel(error)) {
        return Promise.reject({
            ...error,
            status: RequestStatus.REJECTED,
            reason: CancelReason.MANUAL_CANCEL,
        });
    }

    const { config, response, code } = error;

    // 统一错误消息处理
    error.message =
        (config as RequestConfig | undefined)?.errorMessage ||
        (response as { data?: { message?: string } })?.data?.message ||
        getStatusMessage(code || (response as { status?: string | number })?.status || 500);

    // 认证失效处理
    if ([401, 403].includes(((response as { status?: string | number })?.status ?? code) as number)) {
        clearToken();
        // window.location.href = "/login";
    }

    // 显示错误提示
    if ((config as RequestConfig | undefined)?.showError !== false) {
        showMessage((error as { status?: string | number })?.message, "error");
    }

    return Promise.reject({
        ...(typeof error === 'object' ? error : {}),
        status: RequestStatus.REJECTED,
        isBusinessError: (response as { data?: { code?: number } })?.data?.code !== undefined,
    });
}
