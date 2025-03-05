import apiInstance from './apiInstance';
import store from '../store/store';

export const api = {
  login: async (email, password) => {
    const response = await apiInstance.post(
      '/auth/login',
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );

    return response;
  },

  reissue: async () => {
    const response = await apiInstance.post(
      '/auth/reissue',
      {},
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': `${import.meta.env.VITE_API_URL}`,
        },
      },
    );

    return response;
  },

  logout: async () => {
    const response = await apiInstance.post(
      '/auth/logout',
      {},
      {
        withCredentials: true,
      },
    );
    return response;
  },

  signup: async (email, password, isPrivacyPolicyAccepted, isTermsAccepted) => {
    const response = await apiInstance.post('/auth/signup', {
      email: email,
      password: password,
      isPrivacyPolicyAccepted: isPrivacyPolicyAccepted,
      isTermsAccepted: isTermsAccepted,
    });

    return response;
  },

  unsubscribe: async () => {
    const response = await apiInstance.delete('/auth/unsubscribe');
  },

  requestEmailVerificationCode: async (email) => {
    const response = await apiInstance.post('/auth/email-verification-codes', {
      email: email,
    });
    return response;
  },

  checkEmailVerificationCode: async (email, authenticationCode) => {
    const response = await apiInstance.post('/auth/email-verification-codes/validate', {
      email: email,
      authenticationCode: authenticationCode,
    });
    return response;
  },

  getTimepaper: async (timepaperId) => {
    const response = await apiInstance.get(`/timepapers/${timepaperId}`);
    return response;
  },

  createTimepaper: async (title) => {
    const response = await apiInstance.post('/timepapers', {
      title: title,
    });

    return response;
  },

  deleteTimepaper: async (timepaperId) => {
    const response = await apiInstance.delete(`/timepapers/${timepaperId}`);
    return response;
  },

  lockTimepaper: async (timepaperId, email, releaseDate) => {
    const response = await apiInstance.patch(`/timepapers/${timepaperId}/lock`, {
      recipientEmail: email,
      releaseDate: releaseDate,
    });

    return response;
  },

  getPostits: async (timepaperId, page, size = 10) => {
    const response = await apiInstance.get(`/timepapers/${timepaperId}/postits`, {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  },

  createPostit: async (timepaperId, data) => {
    const response = await apiInstance.post(`/timepapers/${timepaperId}/postits`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  deletePostit: async (postitId) => {
    const response = await apiInstance.delete(`/postits/${postitId}`);
    return response;
  },

  getMyTimePapers: async () => {
    const state = store.getState();
    const response = await apiInstance.get(`/my/timepapers`, {
      headers: {
        Authorization: state.auth.accessToken,
      },
      withCredentials: true,
    });
    return response;
  },

  getMyPostits: async () => {
    const state = store.getState();
    const response = await apiInstance.get(`/my/postits`, {
      headers: {
        Authorization: state.auth.accessToken,
      },
      withCredentials: true,
    });
    return response;
  },
};
