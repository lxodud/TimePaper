import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './css/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, loadUser } from './store/slices/authSlice';
import { api } from './api/api';


export default function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const response = await api.reissue();
      dispatch(login(response.headers.authorization));
    })();
  }, []);

  return (
    <>
      <div className="main-container">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}
