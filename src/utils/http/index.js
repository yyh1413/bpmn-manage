// src/utils/request.js
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 从环境变量获取基础地址
  timeout: 10000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 携带 token
    }

    // 可在此处处理 Content-Type
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8';

    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做处理（假设后端返回数据包含 code 字段）
    const res = response.data;

    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接返回
      return response;
    }

    // 根据业务状态码处理（这里假设 200 表示成功）
    if (res.code === '0000000000') {
      return res;
    } else {
      // 处理业务错误
      handleError(res.code, res.msg || 'Error');
      return Promise.reject(new Error(res.msg || 'Error'));
    }
  },
  error => {
    // 对响应错误做处理
    if (error.response) {
      // 有响应但是状态码不在 2xx 范围
      const { status, data } = error.response;
      handleError(status, data.msg || error.msg);

      // 处理 401 未授权
      if (status === 401) {
        handleUnauthorized();
      }
    } else {
      // 无响应（网络错误或请求超时）
      if (error.message.includes('timeout')) {
        ElMessage.error('请求超时，请检查网络连接');
      } else {
        ElMessage.error('网络错误，请检查网络连接');
      }
    }
    return Promise.reject(error);
  }
);

// 错误处理函数
function handleError(code, message) {
  switch (code) {
    case 400:
      ElMessage.error(`请求错误: ${message}`);
      break;
    case 401:
      ElMessage.error('身份验证已过期，请重新登录');
      break;
    case 403:
      ElMessage.error('拒绝访问');
      break;
    case 404:
      ElMessage.error('资源不存在');
      break;
    case 500:
      ElMessage.error('服务器错误');
      break;
    default:
      ElMessage.error(message || `未知错误: ${code}`);
  }
}

// 处理未授权
function handleUnauthorized() {
  localStorage.removeItem('token');
  router.replace('/login');
}

// 封装 GET 请求
function get(url, params, config = {}) {
  const p = {
    ...params,
    // "logId": "1",
    // "systemId": "1",
  };
  console.log(p);

  return service({
    method: 'get',
    url,
    params: p,
    ...config
  });
}

// 封装 POST 请求
function post(url, data, config = {}) {
  const p = {
    ...data,
    // "logId": "1",
    // "systemId": "1",
  };
  return service({
    method: 'post',
    url,
    data: p,
    ...config
  });
}

// 导出 axios 实例（用于其他请求方式）
export default { get, post };