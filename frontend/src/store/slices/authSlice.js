import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: '',
  isLoggedIn: false,
  email: '',
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.email = null;
      state.role = null;
    },
    loadUser: (state, action) => {
      const { email, role } = action.payload;
      state.email = email;
      state.role = role;
    },
  },
});

export const { login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;