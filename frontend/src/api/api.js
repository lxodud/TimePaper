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

  logout: async () => {
    const response = await apiInstance.delete("/auth/unsubcribe")
  },

  requestEmailVerificationCode: async (email) => {
    const response = await apiInstance.post("/auth/email-verification-codes", {
      data: {
        email: email
      }
    })
  },

  getTimepaper: async (id) => {
    const response = await apiInstance.get(`/timepapers/${id}`)
  },

  createTimepaper: async (title) => {
    const response = await apiInstance.post('/timepapers', {
      data: {
        title: title
      }
    })
  },

  deleteTimepaper: async (title) => { 
    const response = await apiInstance.delete(`/timepapers/${id}`)
  },

  lockTimepaper: async () => { 
    const response = await apiInstance.patch(`/timepapers/${id}/lock`)
  },

  getPostits: async () => { 
    const response = await apiInstance.get(`/timepapers/${id}/postits`)
  },

  createPostit: async (rollingPaperId, author, content, image) => { 
    // TODO: multi-part form 데이터
    const response = await apiInstance.post(`/timepapers/${id}/postits`)
  },

  deletePostit: async (id) => { 
    const response = await apiInstance.delete(`/postits/${id}`)
  },

  getMyPostits: async () => { 
    const response = await apiInstance.get(`/my/postits`)
  },

  getMyRollingPapers: async () => { 
    const response = await apiInstance.get(`/my/rollingpapers`)
  }
}