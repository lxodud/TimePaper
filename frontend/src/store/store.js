import { configureStore } from "@reduxjs/toolkit";
import timepapersReducer from "./timepaperSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    timepapers: timepapersReducer,
    auth:authReducer,
    
  },
});

export default store;
