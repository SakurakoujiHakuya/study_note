/**
 * HTTP 请求方法
 */
export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
}

/**
 * 请求数据类型
 */
export enum ContentType {
    JSON = "application/json",
    FORM = "application/x-www-form-urlencoded",
    MULTIPART = "multipart/form-data",
    TEXT = "text/plain",
    HTML = "text/html",
    XML = "application/xml",
}

/**
 * 请求状态
 */
export enum RequestStatus {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
}

/**
 * 请求取消原因
 */
export enum CancelReason {
    MANUAL_CANCEL = "manual_cancel", // 手动取消
    DUPLICATE_REQUEST = "duplicate_request", // 重复请求
    TIMEOUT = "timeout", // 超时取消
    ROUTE_CHANGE = "route_change", // 路由变化取消
}

/**
 * HTTP 状态码与提示信息映射
 */
export const HttpStatusMessage = {
    // 信息响应
    100: "继续请求",
    101: "切换协议",
    102: "处理中",
    103: "早期提示",

    // 成功响应
    200: "请求成功",
    201: "创建成功",
    202: "已接受",
    203: "非授权信息",
    204: "无内容",
    205: "重置内容",
    206: "部分内容",
    207: "多状态",
    208: "已报告",
    226: "IM已使用",

    // 重定向
    300: "多种选择",
    301: "永久移动",
    302: "临时移动",
    303: "查看其他位置",
    304: "未修改",
    305: "使用代理",
    307: "临时重定向",
    308: "永久重定向",

    // 客户端错误
    400: "请求参数错误",
    401: "未授权，请登录",
    402: "需要付款",
    403: "禁止访问",
    404: "资源不存在",
    405: "方法不允许",
    406: "不接受",
    407: "需要代理认证",
    408: "请求超时",
    409: "冲突",
    410: "已删除",
    411: "需要有效长度",
    412: "前提条件失败",
    413: "请求实体过大",
    414: "URI过长",
    415: "不支持的媒体类型",
    416: "范围不符合要求",
    417: "期望失败",
    418: "我是一个茶壶",
    421: "错误的请求",
    422: "不可处理的实体",
    423: "已锁定",
    424: "依赖失败",
    425: "过早",
    426: "需要升级",
    428: "需要前提条件",
    429: "请求过多",
    431: "请求头字段过大",
    451: "因法律原因不可用",

    // 服务端错误
    500: "服务器内部错误",
    501: "未实现",
    502: "网关错误",
    503: "服务不可用",
    504: "网关超时",
    505: "HTTP版本不支持",
    506: "变种协商",
    507: "存储空间不足",
    508: "检测到循环",
    510: "未扩展",
    511: "需要网络认证",
} as const;

/**
 * 业务状态码与提示信息映射
 */
export const BusinessStatusMessage = {
    // 成功
    200: "操作成功",

    // 客户端错误
    400: "错误请求",
    401: "未授权，请登录",
    403: "禁止访问",
    404: "资源不存在",

    // 服务器错误
    500: "服务器错误",
    502: "网关错误",
    503: "服务不可用",
    504: "网关超时",

    // 自定义业务错误
    10001: "参数错误",
    10002: "数据不存在",
    10003: "数据已存在",
    10004: "请求过于频繁",
    10005: "验证码错误",
    10006: "权限不足",
    10007: "账号或密码错误",
    10008: "账号已被禁用",
    10009: "资源已被占用",
    10010: "操作过于频繁，请稍后再试",
} as const;

/** 获取状态码对应消息 */
export function getStatusMessage(
    code: number,
    defaultMsg: string = "请求失败"
): string {
    return BusinessStatusMessage[code] || HttpStatusMessage[code] || defaultMsg;
}

// /**
//  * 获取状态码对应的提示信息
//  */
// export function getStatusMessage(
//   code: number,
//   defaultMessage: string = '请求失败'
// ): string {
//   // 优先查找业务状态码
//   if (BusinessStatusMessage[code as keyof typeof BusinessStatusMessage]) {
//     return BusinessStatusMessage[code as keyof typeof BusinessStatusMessage];
//   }

//   // 其次查找HTTP状态码
//   if (HttpStatusMessage[code as keyof typeof HttpStatusMessage]) {
//     return HttpStatusMessage[code as keyof typeof HttpStatusMessage];
//   }

//   return defaultMessage;
// }
