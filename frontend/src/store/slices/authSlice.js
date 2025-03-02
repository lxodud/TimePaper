import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;