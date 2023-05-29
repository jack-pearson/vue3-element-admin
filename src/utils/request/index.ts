import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { HttpGlobalResponse } from "@/types";
import { ElNotification } from "element-plus";
import router from "@/router";
import { Local, Session } from "@/utils";
// import LoginService from "@/apis";

const showStatus = (status: number) => {
  let message = "";
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `连接出错${status ? `(${status}}` : ""}!`;
  }
  return message;
};
const [TIME_OUT] = [10000];
const pending: Map<any, any> = new Map();
/* 实例化请求配置 */
const instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
  // 请求时长
  timeout: TIME_OUT,
  baseURL: import.meta.env.VITE_API_BASE_URL as any,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});
/** 移除请求 */
const removePending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join("&");
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    pending.delete(url);
  }
};
/** 添加请求 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join("&");
  if (!pending.has(url)) {
    pending.set(url, config);
  }
};
/** 请求拦截器 */
instance.interceptors.request.use(
  (config: any) => {
    const token = Session.get("token");
    token && (config.headers.Authorization = `Bearer ${token}`);
    removePending(config);
    addPending(config);
    return config;
  }, // 请求错误
  (error: any) => {
    return Promise.reject(error);
  }
);

/** 响应拦截器 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response.config);
    if (response.data.code === 500) {
      ElNotification.error({
        title: "系统错误",
        message: response.data.message,
      });
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    const { config, response } = error;
    ElNotification.error({
      title: showStatus(response?.status),
      message: response?.data?.data?.error || "系统错误",
      duration: TIME_OUT,
    });
    if (response.status === 401) {
      Local.clear();
      Session.clear();
      router.replace({ path: "/login" });
    }
    removePending(config);
    return Promise.reject(error);
  }
);

export const request = async <T = any>(config: AxiosRequestConfig): Promise<HttpGlobalResponse<T>> => {
  const { data } = await instance.request<HttpGlobalResponse<T>>(config);
  return data;
};
