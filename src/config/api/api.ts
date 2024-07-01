import axios from 'axios';
const api_url = import.meta.env.APP_HOST;

export class Api {
  static instance = axios.create({
    baseURL: api_url,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${localStorage.getItem('token')}`,
    }
    // timeout: 1000,
  });
}
