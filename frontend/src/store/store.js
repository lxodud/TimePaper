import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import headerReducer from './slices/headerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
  },
});

export default store;
