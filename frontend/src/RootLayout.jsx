import React from 'react';
import { Outlet } from 'react-router-dom';
import RootHeader from './Components/RootHeader';

export default function RootLayout() {
  return (
    <>
      <RootHeader></RootHeader>
      <Outlet></Outlet>
      <footer></footer>
    </>
  );
}
