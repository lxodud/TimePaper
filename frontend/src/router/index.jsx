import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layout/RootLayout.jsx';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login.jsx';
import Signup from '../pages/SignUp';
import MyPage from '../pages/MyPage.jsx';
import TimePaperDetail from '../pages/timepaperDetail/TimePaperDetail';
import TimePaperIsLocked from '../pages/timepaperlocked/TimePaperIsLocked.jsx';
import PostItCreate from '../pages/postitcreate/PostItCreate';
import NotFound from '../pages/error/NotFound';
import HeaderLayout from '../layout/HeaderLayout.jsx';
import TimePaperCreate from '../pages/timepapercreate/TimePaperCreate.jsx';
import TimePaperSetLock from '../pages/timepaperSetlocked/TimePaperSetLock.jsx';

import ModalTest from '../pages/modal/ModalTest.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <HeaderLayout />,
        children: [
          {
            path: '/signup',
            element: <Signup />,
          },
          {
            path: '/my',
            element: <MyPage />,
          },
          {
            path: '/postit/create',
            element: <PostItCreate />,
          },
          {
            path: '/test',
            element: <ModalTest></ModalTest>,
          },
          {
            path: '/timepaper',
            children: [
              {
                index: true,
                element: <Navigate to="/" replace />,
              },
              {
                path: 'create',
                element: <TimePaperCreate />,
              },
              {
                path: ':timepaperId',
                element: <TimePaperDetail />,
              },
              {
                path: ':timepaperId/lock',
                element: <TimePaperIsLocked />,
              },
              {
                path: ':timepaperId/capsule',
                element: <TimePaperSetLock />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
