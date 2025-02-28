import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageTitle: " "
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setPageTitle(state, action) {
      state.pageTitle = action.payload;
    },
  },
});

export const { setPageTitle } = headerSlice.actions;
export default headerSlice.reducer;