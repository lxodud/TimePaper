import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import RootLayout from '../layout/RootLayout.jsx';
import HeaderLayout from '../layout/HeaderLayout.jsx';
import NotFound from '../pages/error/NotFound';

const SignUp = lazy(() => import('../pages/signup/SignUp.jsx'));
const Home = lazy(() => import('../pages/home/Home'));
const Login = lazy(() => import('../pages/login/Login.jsx'));
const MyPage = lazy(() => import('../pages/MyPage.jsx'));
const TimePaperDetail = lazy(() => import('../pages/time-paper-detail/TimePaperDetail.jsx'));
const TimePaperIsLocked = lazy(() => import('../pages/time-paper-is-locked/TimePaperIsLocked.jsx'));
const PostItCreate = lazy(() => import('../pages/postit-create/PostItCreate.jsx'));
const TimePaperCreate = lazy(() => import('../pages/time-paper-create/TimePaperCreate.jsx'));
const TimePaperSetLock = lazy(() => import('../pages/time-paper-set-lock/TimePaperSetLock.jsx'));

import LoadingSpinner from '../components/LoadingSpinner';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/',
        element: <HeaderLayout />,
        children: [
          {
            path: '/signup',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <SignUp />
              </Suspense>
            ),
          },
          {
            path: '/my',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <MyPage />
              </Suspense>
            ),
          },

          // {
          //   path: '/my/myinfo',
          //   element: <MyPage section="myinfo" />,
          // },
          // {
          //   path: '/my/postits',
          //   element: <MyPage />,
          // },

          // {
          //   path: '/my/timepapers',
          //   element: <MyPage />,
          // },

          {
            path: '/timepaper',
            children: [
              {
                index: true,
                element: <Navigate to="/" replace />,
              },
              {
                path: 'create',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <TimePaperCreate />
                  </Suspense>
                ),
              },
              {
                path: ':timepaperId',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <TimePaperDetail />
                  </Suspense>
                ),
              },
              {
                path: ':timepaperId/lock',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <TimePaperIsLocked />
                  </Suspense>
                ),
              },
              {
                path: ':timepaperId/capsule',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <TimePaperSetLock />
                  </Suspense>
                ),
              },
              {
                path: ':timepaperId/postit/create',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <PostItCreate />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
