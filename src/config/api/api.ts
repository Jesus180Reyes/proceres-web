import axios from 'axios';
const api_url = import.meta.env.APP_HOST;

export class Api {
  static instance = axios.create({
    baseURL: api_url,
    // timeout: 1000,
  });
}
