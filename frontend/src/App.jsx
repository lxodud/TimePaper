import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './css/index.css'


export default function App() {
  return (
    <>
      <div className='main-container'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}
