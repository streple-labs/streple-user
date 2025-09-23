import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { cookies } from "next/headers";
import { base_url } from "../constants";
import { AuthenticationError, createNetworkError } from "../utils";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
  _retry?: boolean;
}

const api = axios.create({
  baseURL: base_url,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    const path = config.url ? new URL(config.url, base_url).pathname : "";
    const isAuthUrl = path.startsWith("/auth/");
    if (!isAuthUrl) {
      const token = (await cookies()).get("streple_auth_token")?.value;

      if (token && config.headers)
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.metadata = { startTime: new Date() };

    if (process.env.NODE_ENV === "development")
      console.log("🚀 Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      });

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request setup error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as CustomAxiosRequestConfig;

    const endTime = new Date();
    const duration = config?.metadata?.startTime
      ? endTime.getTime() - config.metadata.startTime.getTime()
      : 0;

    if (process.env.NODE_ENV === "development")
      console.log("✅ Response:", {
        status: response.status,
        url: response.config.url,
        duration: `${duration}ms`,
        data: response.data,
      });

    return response;
  },
  async (error: AxiosError) => {
    const { response, request, config } = error;

    const originalRequest = config as CustomAxiosRequestConfig;
    const duration = originalRequest.metadata
      ? new Date().getTime() - originalRequest.metadata.startTime.getTime()
      : 0;

    if (response) {
      const errorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: config?.url,
        duration: `${duration}ms`,
        data: response.data,
      };

      console.error("🔥 Response Error:", errorInfo);

      if (response.status === 401)
        return Promise.reject(new AuthenticationError("Token refresh failed"));
    } else if (request) {
      console.error("🌐 Network Error:", {
        message: "No response received",
        url: config?.url,
        duration: `${duration}ms`,
      });
      const networkError = createNetworkError(error, originalRequest, duration);
      return Promise.reject(networkError);
    } else console.error("⚙️ Request Setup Error:", error.message);

    return Promise.reject(error);
  }
);

export default api;
