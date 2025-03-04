import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './css/index.css';
import { Provider, useDispatch } from 'react-redux';
import { login } from './store/slices/authSlice';
import { api } from './api/api';

export default function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
  (async () => {
    const response = await api.reissue()
    dispatch(login(response.headers.authorization))
  })()
  }, [])
  
  return (
    <>
        <div className="main-container mypage-container"  >
          <RouterProvider router={router}></RouterProvider>
        </div>
    </>
  );
}
