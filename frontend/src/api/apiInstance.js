import axios from 'axios';

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


apiInstance.interceptors.request.use((config) => {
  
  const isRequireToken = !NO_TOKEN_REQUIRED.includes(config.url);
  const isGetTimepaper = GET_TIMEPAPER_REGEX.test(config.url) && (config.method === "get");

  if (isRequireToken && !isGetTimepaper) {
    // TODO: access token 가져오기
    config.headers["Authorization"] = `Bearer `;
  }

  return config
})

apiInstance.interceptors.response.use((config) => {
  return config
  // refresh token 핸들링
})


export default apiInstance