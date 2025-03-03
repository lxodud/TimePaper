import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layout/RootLayout.jsx';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login.jsx';
import Signup from '../pages/SignUp';
import MyPage from '../pages/MyPage.jsx';
import TimePaperDetail from '../pages/time-paper-detail/TimePaperDetail.jsx';
import TimePaperIsLocked from '../pages/time-paper-is-locked/TimePaperIsLocked.jsx';
import PostItCreate from '../pages/postit-create/PostItCreate.jsx';
import NotFound from '../pages/error/NotFound';
import HeaderLayout from '../layout/HeaderLayout.jsx';
import TimePaperCreate from '../pages/time-paper-create/TimePaperCreate.jsx';
import TimePaperSetLock from '../pages/time-paper-set-lock/TimePaperSetLock.jsx';

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
