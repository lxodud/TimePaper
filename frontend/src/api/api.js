import { data } from "react-router-dom";
import apiInstance from "./apiInstance";

export const api = {
  login: async (email, password) => { 
    const response = await apiInstance.post("/auth/login", {
        email: email,
        password: password
    }, {
      withCredentials: true
    })

    return response
  },

  reissue: async () => { 
    const response = await apiInstance.post("/auth/reissue", {}, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': `${import.meta.env.VITE_API_URL}` 
      }
    })
    return response
  },

  logout: async () => {
    const response = await apiInstance.delete("/auth/logout")
  },

  signup: async (email, password, isPrivacyPolicyAccepted, isTermsAccepted, isEmailConsent) => {
    const response = await apiInstance.post("/auth/signup", {
        email: email,
        password: password,
        isPrivacyPolicyAccepted : isPrivacyPolicyAccepted,
        isTermsAccepted : isTermsAccepted,
        isEmailConsent : isEmailConsent
    })
  },

  unsubscribe: async () => {
    const response = await apiInstance.delete("/auth/unsubscribe")
  },

  requestEmailVerificationCode: async (email) => {
    const response = await apiInstance.post("/auth/email-verification-codes", {
        email: email
    })
  },

  checkEmailVerificationCode: async (authenticationCode) => { 
    const response = await apiInstance.post("/auth/email-verification-codes/validate", {
        authenticationCode: authenticationCode
    })
  },

  getTimepaper: async (timepaperId) => {
    const response = await apiInstance.get(`/timepapers/${timepaperId}`)
  },

  createTimepaper: async (title) => {
    const response = await apiInstance.post('/timepapers', {
        title: title
    })

    return response
  },

  deleteTimepaper: async (timepaperId) => { 
    const response = await apiInstance.delete(`/timepapers/${timepaperId}`)
  },

  lockTimepaper: async (timepaperId) => { 
    const response = await apiInstance.patch(`/timepapers/${timepaperId}/lock`)
  },

  getPostits: async (timepaperId) => { 
    const response = await apiInstance.get(`/timepapers/${timepaperId}/postits`)
  },

  createPostit: async (timepaperId, data) => { 
    const response = await apiInstance.post(`/timepapers/${timepaperId}/postits`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response;
  },

  deletePostit: async (postitId) => { 
    const response = await apiInstance.delete(`/postits/${postitId}`)
  },

  getMyPostits: async () => { 
    const response = await apiInstance.get(`/my/postits`)
  },

  getMyTimePapers: async () => { 
    const response = await apiInstance.get(`/my/timepapers`)
  }
}
