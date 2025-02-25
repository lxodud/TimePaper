import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const [timepaper, setTimepaper] = useState({title:"",post:""});

const initialState = [
  id : 1,
  title : "untitled",
  post: " "
  
];

const timepaperSlice = createSlice({
  name: "timepapers",
  initialState,
  reducers: {

  // timepapers:timepaperSlice,
    addTimepaper: (state, action) => {
      state.push(action.payload);
    },

  },
});
export const { addTimepaper } = timepaperSlice.actions;
export default timepaperSlice.reducer;
