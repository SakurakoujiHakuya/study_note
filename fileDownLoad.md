# 文件下载
## 请求函数部分
要注意要添加一个responseType:'blob',确保返回的是blob类型的
```javaScript
export const downloadsFileByPost = async (reqUrl, fileName, params = {}) => {
  try {
    // 1. 发起请求（确保 responseType: 'blob'）
    const blobData = await service.post(reqUrl, params, {
      responseType: 'blob', // 关键：确保返回 Blob
    });

    // 2. 创建临时下载链接
    const url = window.URL.createObjectURL(blobData);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    // 3. 触发下载
    document.body.appendChild(link);
    link.click();

    // 4. 清理资源
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error('文件下载失败:', error);
    throw error; // 继续抛出错误，让外层捕获
  }
};
```
## 拦截器部分
要注意判断response.config.responseType,正常返回
```javaScript
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // For blob responses (file downloads), return the blob directly
    if (response.config.responseType === 'blob') {
      return response.data; // Return just the blob data
    }

    // Rest of your existing interceptor logic
    if (!response.data.code) {
      const resType = Object.prototype.toString.call(response.data);
      if (resType === '[object String]') return response;
    }
    
    const type = typeof response.data;
    if (type === 'string') {
      message.error('系统出错');
      return Promise.reject(new Error('Error'));
    }
    
    if (response.data.result.code === 0) {
      return response.data.result.content || true;
    } else if (response.data.code === 200) {
      return response.data.result;
    } else {
      message.error(response.data.msg || response.data.result.msg || '系统出错');
      return Promise.reject(new Error(response.data.msg || 'Error'));
    }
  },
  (error: any) => {
    return Promise.reject(error.message);
  },
);
```


