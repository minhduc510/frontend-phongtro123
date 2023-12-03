import axios from 'axios';

import { apiClient } from '.';
import path from '@/routes/path';
import { localStorage, swal } from '@/helpers';

let run = true;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstance2 = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
  headers: { 'Content-Type': 'multipart/form-data' },
});

axiosInstance2.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { token } = localStorage.getAuth();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance2.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data?.status === 401) {
      const access_token: string =
        `${response.config.headers['Authorization']}`.split(
          ' ',
        )[1];
      const { error: error_tokenApi, token } =
        await apiClient.getAccessToken(access_token);
      if (run) {
        if (!error_tokenApi) {
          localStorage.setTokenAuth(true, token);
          response.config.headers['Authorization'] =
            'Bearer ' + token;
          run = false;
          return await axios.request(response.config);
        } else {
          swal
            .warning(
              'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại !!!',
            )
            .then(() => {
              localStorage.setTokenAuth(false, null);
              window.location.pathname = `${path.login}`;
            });
        }
      }
    }
    run = true;
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { axiosInstance, axiosInstance2 };
