import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

import headerReducer from './slices/headerSlice';
import loadingReducer from './slices/loadingSlice';
import pathReducer from './slices/pathSlice'; // pathSlice 파일 경로에 맞게 수정

const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    loading: loadingReducer,
    path: pathReducer,
  },
});

export default store;
