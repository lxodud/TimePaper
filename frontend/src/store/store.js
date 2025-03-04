import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import headerReducer from './slices/headerSlice';
import loadingReducer from './slices/loadingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    loading: loadingReducer
  },
});

export default store;
