import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state, action) {
      state.isLoading = true;
    },
    finishLoading(state, action) {
      state.isLoading = false;
    }
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;
export default loadingSlice.reducer;