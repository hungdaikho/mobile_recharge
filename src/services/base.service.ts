import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ServiceBase {
  protected api: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });

    // Add interceptor to inject token if available
    this.api.interceptors.request.use((config) => {
      if (this.token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.api.get<T>(url, config).then(res => res.data);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.post<T>(url, data, config).then(res => res.data);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.put<T>(url, data, config).then(res => res.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.api.delete<T>(url, config).then(res => res.data);
  }
}
