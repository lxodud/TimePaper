import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layout/RootLayout.jsx';
import Home from '../pages/Home';
import SignUp from '../pages/signup/SignUp.jsx';
import Login from '../pages/login/Login.jsx';
import MyPage from '../pages/MyPage.jsx';
import TimePaperCreate from '../pages/TimePaperCreate';
import TimePaperDetail from '../pages/TimePaperDetail';
import TimePaperIsLocked from '../pages/TimePaperIsLocked.jsx';
import PostItCreate from '../pages/PostItCreate';
import NotFound from '../pages/NotFound';
import HeaderLayout from '../layout/HeaderLayout.jsx';

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
            element: <SignUp></SignUp>,
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
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
