import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loading(state, action) {
      state.isLoading = true;
    },
    stop(state, action) {
      state.isLoading = false;
    }
  },
});

export const { loading, stop } = loadingSlice.actions;
export default loadingSlice.reducer;