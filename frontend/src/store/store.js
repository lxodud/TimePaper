import { configureStore } from "@reduxjs/toolkit";
import timepapersReducer from "./timepaperSlice";

const store = configureStore({
  reducer: {
    timepapers: timepapersReducer,
    
  },
});

export default store;
