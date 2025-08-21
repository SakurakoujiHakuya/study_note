import router from "@/router";

class RouterJump {
  /**
   * 跳转到指定路径（保留历史记录）
   * @param path 目标路径
   * @param params 查询参数
   * @param blank 是否打开新标签页
   */
  push(path: string, params?: any, blank?: Boolean) {
    const fullPath = this.getFullPath(path);
    if (this.openNewTab(path, params, blank)) return;
    if (window.qiankunStarted) {
      window.proxy.hostRouter.push({ path: fullPath, query: params });
    } else {
      router.push({ path: fullPath, query: params });
    }
  }

  /**
   * 替换当前路由（不保留历史记录）
   * @param path 目标路径
   * @param params 查询参数
   */
  replace(path: string, params?: any) {
    const fullPath = this.getFullPath(path);
    if (window.qiankunStarted) {
      window.proxy.hostRouter.replace({ path: fullPath, query: params });
    } else {
      router.replace({ path: fullPath, query: params });
    }
  }

  /**
   * 在历史记录中前进或后退
   * @param delta 步数（正数前进，负数后退）
   */
  go(delta: number) {
    if (window.qiankunStarted) {
      window.proxy.hostRouter.go(delta);
    } else {
      router.go(delta);
    }
  }

  /**
   * 处理路径
   * @param path 原始路径
   * @returns 最终路径
   */
  private getFullPath(path: string): string {
    // `/subapp/${window.proxy.qiankunName}${path.startsWith('/') ? path : `/${path}`}`
    return window.qiankunStarted ? path : path.replace(/^(\/[^\/]+){2}/, "");
  }

  /**
   * 打开新标签页
   * @param path 目标路径
   * @param params 查询参数
   * @param blank 是否打开新标签页
   * @returns Boolean
   */
  private openNewTab(path: string, params?: any, blank?: Boolean) {
    if (blank) {
      const queryString = this.URLSearchParams(path, params);
      let url = "";
      if (queryString) {
        url = `${path}?${queryString}`;
      } else {
        url = path;
      }
      window.open(url, "_blank");
      return true;
    }
    return false;
  }

  /**
   * 转换查询参数
   * @param path 目标路径
   * @param params 查询参数
   * @returns URL 编码
   */
  private URLSearchParams(path: string, params?: any) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams.append(key, params[key]);
      }
    }
    const queryString = searchParams.toString();
    return queryString;
  }
}

export const routerJump = new RouterJump();
