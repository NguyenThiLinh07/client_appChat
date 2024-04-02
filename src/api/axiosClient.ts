import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { clearAllData } from '../helpers/funcs';
import { getTokenFromCookie } from '../helpers/cookies';
import { IndexedObject } from '../types/common';

export enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

const handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Check network status
  if (!navigator.onLine) {
    // Handle offline mode
    const shouldBypassOffline = config.headers['x-should-bypass-offline'] || false;
    if (!shouldBypassOffline) {
      throw new Error('You are currently offline. Please check your network connection!');
    }
  }

  let token = getTokenFromCookie();
  if (token !== null && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance ?? this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL_CLIENT,
      headers,
    });

    http.interceptors.request.use(handleRequest, (error: AxiosRequestConfig) =>
      Promise.reject(error),
    );

    http.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosResponse) => this.handleError(error),
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const deleteFunction = this.http.delete as any;
    return deleteFunction(url, data, config);
  }

  private async handleError(error: IndexedObject) {
    if (error.code === 'ERR_NETWORK') {
      clearAllData();
    }

    if (error.response.status === StatusCode.Unauthorized) {
      clearAllData();
    }

    // const { response, config } = error;
    // if (!listApisNotRefreshToken.includes(config.url) && response) {
    //   if (response.status === StatusCode.Unauthorized && !config._retry) {
    //     config._retry = true;
    //     try {
    //       const refreshToken = getRefreshTokenFromLocalStorage();
    //       const rs = await axiosClient.post<
    //         TRefreshTokenRequest,
    //         { data: { access: TokenObject; refresh: TokenObject } }
    //       >('auth/refresh-tokens', {
    //         refreshToken,
    //       });
    //       const { access, refresh } = rs.data;
    //       saveToken(access.token);
    //       saveRefreshToken(refresh.token);
    //       return this.http({
    //         ...config,
    //         headers: config.headers.toJSON(),
    //       });
    //     } catch (_error) {
    //       return Promise.reject(_error);
    //     }
    //   }
    // }

    return Promise.reject(error);
  }
}

export const axiosClient = new Http();
