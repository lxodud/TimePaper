import { data } from "react-router-dom";
import apiInstance from "./apiInstance";

export const api = {
  login: async (username, password) => { 
    const response = await apiInstance.post("/auth/login", {
      data: {
        username: username,
        password: password
      }
    })
  },

  logout: async () => {
    const response = await apiInstance.delete("/auth/logout")
  },

  signup: async (email, password, isPrivacyPolicyAccepted, isTermsAccepted, isEmailConsent) => {
    const response = await apiInstance.post("/auth/signup", {
      data: {
        email: email,
        password: password,
        isPrivacyPolicyAccepted : isPrivacyPolicyAccepted,
        isTermsAccepted : isTermsAccepted,
        isEmailConsent : isEmailConsent
      }
    })
  },

  unsubscribe: async () => {
    const response = await apiInstance.delete("/auth/unsubscribe")
  },

  requestEmailVerificationCode: async (email) => {
    const response = await apiInstance.post("/auth/email-verification-codes", {
      data: {
        email: email
      }
    })
  },

  checkEmailVerificationCode: async (authenticationCode) => { 
    const response = await apiInstance.post("/auth/email-verification-codes/validate", {
      data: {
        authenticationCode: authenticationCode
      }
    })
  },

  getTimepaper: async (timepaperId) => {
    const response = await apiInstance.get(`/timepapers/${timepaperId}`)
  },

  createTimepaper: async (title) => {
    const response = await apiInstance.post('/timepapers', {
      data: {
        title: title
      }
    })
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

  createPostit: async (timepaperId, author, content, image) => { 
    // TODO: multi-part form 데이터
    const response = await apiInstance.post(`/timepapers/${timepaperId}/postits`)
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