import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const token = import.meta.env.NETFLIX_TOKEN_API;
const http = axios.create({
  baseURL: import.meta.env.NETFLIX_BASE_URL || 'https://api.themoviedb.org/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = config;

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    if (newConfig.data) {
      newConfig.data = JSON.stringify(snakecaseKeys(config.data));
    }

    return newConfig;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log('HTTP-REQUEST-ERROR:', error);
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const newResponse = response;

    if (newResponse && newResponse.data) {
      let responseData = newResponse.data;
      responseData = camelcaseKeys(newResponse, {
        deep: true
      });

      return responseData;
    }

    return newResponse.data;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http;
