import React from 'react';
import { Outlet } from 'react-router-dom';
import RootHeader from '../components/rootheader/RootHeader';

export default function HeaderLayout() {
  return (
    <>
      <RootHeader></RootHeader>
      <Outlet></Outlet>
    </>
  );
}
