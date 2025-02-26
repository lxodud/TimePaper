import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './css/index.css'
import store from "./store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
    <Provider store={store}>
      <div className='main-container'>
        <RouterProvider router={router}></RouterProvider>
      </div>
      </Provider>
    </>
  );
}
