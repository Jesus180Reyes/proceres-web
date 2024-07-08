import axios from 'axios';
const api_url = import.meta.env.APP_HOST;

export class Api {
  static instance = axios.create({
    baseURL: api_url,
    headers: {
      'Content-Type': 'application/json',
    },
    // timeout: 1000,
  });
  static setupInterceptors() {
    Api.instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
}
Api.setupInterceptors();
