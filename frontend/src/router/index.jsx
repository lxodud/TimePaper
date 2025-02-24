import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../RootLayout.jsx';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import MyPage from '../pages/MyPage.jsx';
import TimePaperCreate from '../pages/TimePaperCreate';
import TimePaperDetail from '../pages/TimePaperDetail';
import TimePaperIsLocked from '../pages/TimePaperIsLocked.jsx';
import PostItCreate from '../pages/PostItCreate';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },

      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/my',
        element: <MyPage />,
      },
      {
        path: '/timepaper',
        children: [
          {
            index:true,
            element:<Home />
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
      {
        path: '/postit/create',
        element: <PostItCreate />,
      },
    ],
  },
]);

export default router;
