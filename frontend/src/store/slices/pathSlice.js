import { createSlice } from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'path',
  initialState: {
    currentPath: '/my/timepapers', // 기본 경로 설정
  },
  reducers: {
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
});

export const { setCurrentPath } = pathSlice.actions; // setCurrentPath 내보내기
export default pathSlice.reducer; // 리듀서 내보내기