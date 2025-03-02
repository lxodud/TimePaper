import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Outlet } from 'react-router-dom';
import UnderBarButton from '../components/UnderBarButton/UnderBarButton';
import { api } from '../api/api';

export default function RootLayout() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    (async () => {
      try {
        const response = await api.logout();
        dispatch(logout());
        if (response.status === 204) {
          alert('로그아웃 되었습니다.');
        }
      } catch (error) {
        console.error(error);
        dispatch(logout());
        console.warn('서버 통신 에러');
      }
    })();
  };

  return (
    <>
      <Outlet></Outlet>
      {/* 개발 편의성을 위한 임시 로그아웃 버튼입니다. */}
      <footer>
        {isLoggedIn && <UnderBarButton onClick={handleLogout} title={'로그아웃'}></UnderBarButton>}
      </footer>
    </>
  );
}
