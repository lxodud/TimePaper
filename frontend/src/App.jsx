import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './css/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/slices/authSlice';
import { api } from './api/api';
import Loading from './components/Loading/Loading';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    (async () => {
      const response = await api.reissue();
      dispatch(login(response.headers.authorization));
    })();
  }, []);

  return (
    <>
      <div className="main-container">
        {isLoading && <Loading></Loading>}
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}
