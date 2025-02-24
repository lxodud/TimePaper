import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout.jsx';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import MyPage from '../pages/MyPage.jsx';
import TimePaperCreate from '../pages/TimePaperCreate';
import TimePaperDetail from '../pages/TimePaperDetail';
import TimePaperIsLocked from '../pages/TimePaperIsLocked.jsx';
import PostItCreate from '../pages/PostItCreate';
import NotFound from '../pages/error/NotFound.jsx';
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
                element: <Home />,
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
