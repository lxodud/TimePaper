import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import headerReducer from './slices/headerSlice';
import pathReducer from './slices/pathSlice'; // pathSlice 파일 경로에 맞게 수정

const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    path: pathReducer,
  },
});

export default store;
