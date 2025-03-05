import axios from 'axios';
import store from '../store/store';
// import { api } from './api'
import { login } from '../store/slices/authSlice';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const NO_TOKEN_REQUIRED = [
  '/auth/login',
  '/auth/signup',
  '/auth/email-verification-codes',
  '/auth/email-verification-codes/validate',
];

const GET_TIMEPAPER_REGEX = /^\/timepapers\/\d+$/;

apiInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const isRequireToken = !NO_TOKEN_REQUIRED.includes(config.url);
  const isGetTimepaper = GET_TIMEPAPER_REGEX.test(config.url) && config.method === 'get';

  if (isRequireToken && !isGetTimepaper) {
    config.headers['Authorization'] = state.auth.accessToken;
  }

  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const response = error.response;
    if (response.data?.code === 3001) {
      try {
        const response = await api.reissue();
        const accessToken = response.headers.authorization;
        store.dispatch(login(accessToken));
        originalRequest.headers['Authorization'] = accessToken;
        return apiInstance(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
