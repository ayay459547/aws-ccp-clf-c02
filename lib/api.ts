// src/lib/axios.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// 建立 Axios 實體
const service: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "", // 使用環境變數設定 API 網址
  timeout: 10000, // 請求超時時間
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------------
// 請求攔截器 (Request Interceptor)
// ------------------------------------
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 檢查是否在客戶端 (Client-side) 環境
    if (typeof window !== "undefined") {
      // 假設 Token 存在 localStorage (如果是存 Cookie 則直接讓瀏覽器帶上即可)
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      // 如果是在伺服器端 (Server-side) 發送請求
      // Next.js (App Router) 可以在這裡動態引入 cookies
      // const { cookies } = require('next/headers');
      // const token = cookies().get('token')?.value;
      // if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// ------------------------------------
// 回應攔截器 (Response Interceptor)
// ------------------------------------
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // Axios 預設會把伺服器回傳的資料包在 response.data 中
    // 我們可以這裡直接 return response.data，讓組件呼叫時不需要再解構一次
    const { data } = response;

    // 自訂 API 邏輯狀態碼檢查 (例如後端統一回傳 { code: 200, data: {...}, message: "..." })
    // if (data.code !== 200) {
    //   return Promise.reject(new Error(data.message || 'Error'));
    // }

    return data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    // 統一的錯誤提示處理
    if (status) {
      switch (status) {
        case 401:
          console.error("未授權，請重新登入");
          // 執行登出邏輯或跳轉到登入頁
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;
        case 403:
          console.error("沒有權限拒絕存取");
          break;
        case 404:
          console.error("請求的資源不存在");
          break;
        case 500:
          console.error("伺服器發生錯誤");
          break;
        default:
          console.error(`連線錯誤: ${status}`);
      }
    } else {
      console.error("網路超時或伺服器無回應");
    }

    return Promise.reject(error);
  },
);

export default service;
