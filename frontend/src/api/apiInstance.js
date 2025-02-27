import axios from 'axios';
import store from '../store/store'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const NO_TOKEN_REQUIRED = [
  "/auth/login",
  "/auth/signup",
  "/auth/email-verification-codes",
  "/auth/email-verification-codes/validate"
];

const GET_TIMEPAPER_REGEX = /^\/timepapers\/\d+$/;

const state = store.getState()

apiInstance.interceptors.request.use((config) => {
  const isRequireToken = !NO_TOKEN_REQUIRED.includes(config.url);
  const isGetTimepaper = GET_TIMEPAPER_REGEX.test(config.url) && (config.method === "get");

  if (isRequireToken && !isGetTimepaper) {
    config.headers["Authorization"] = state.auth.accessToken;
  }

  return config
})

apiInstance.interceptors.response.use((config) => {
  return config
  // refresh token 핸들링
})


export default apiInstance