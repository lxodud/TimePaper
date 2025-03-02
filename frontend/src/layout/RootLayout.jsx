import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Outlet } from 'react-router-dom';
import UnderBarButton from '../components/UnderBarButton/UnderBarButton';
import { api } from '../api/api';

export default function RootLayout() {
  const { accessToken, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('로그아웃 버튼 클릭');
    //로그아웃 api 호출
    (async () => {
      try {
        const response = await api.logout();
        console.log(response);
        if (response.status === 204) {
          dispatch(logout());
          //임시
          alert('로그아웃 되었습니다.');
        }
      } catch (error) {
        console.error(error);
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
