const TOKEN_KEY = 'X-Access-Token';
const TOKEN_EXPIRES_KEY = 'refresh_token';

/**
 * 获取存储的token
 * @returns token字符串或undefined
 */
export function getToken(): string | undefined {
  const token = localStorage.getItem(TOKEN_KEY);
  return token || undefined;
}

/**
 * 设置token
 * @param token token字符串
 * @param expiresIn 过期时间(秒)
 */
export function setToken(token: string, expiresIn?: number): void {
  localStorage.setItem(TOKEN_KEY, token);
  if (expiresIn) {
    const expires = Date.now() + expiresIn * 1000;
    localStorage.setItem(TOKEN_EXPIRES_KEY, expires.toString());
  } else {
    localStorage.removeItem(TOKEN_EXPIRES_KEY);
  }
}

/**
 * 清除token
 */
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_KEY);
}

/**
 * 检查token是否过期
 * @returns 是否过期
 */
export function isTokenExpired(): boolean {
  const expires = localStorage.getItem(TOKEN_EXPIRES_KEY);
  
  if (!expires) {
    return true; // 没有设置过期时间视为已过期
  }
  
  return Date.now() > parseInt(expires, 10);
}

/**
 * 获取token剩余有效时间(秒)
 * @returns 剩余秒数，未设置过期时间返回null
 */
export function getTokenExpiresIn(): number | null {
  const expires = localStorage.getItem(TOKEN_EXPIRES_KEY);
  
  if (!expires) {
    return null;
  }
  
  const remaining = (parseInt(expires, 10) - Date.now()) / 1000;
  return remaining > 0 ? Math.floor(remaining) : 0;
}