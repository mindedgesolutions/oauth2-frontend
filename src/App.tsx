import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as Ch from '@/pages';
import { store } from './store';
import { loader as layoutLoader } from '@/pages/Layout';
import { loader as signinLoader } from '@/pages/auth/Signin';
import { loader as callbackLoader } from '@/pages/auth/Callback';

const router = createBrowserRouter([
  { path: '/', element: <Ch.Signin />, loader: signinLoader },
  { path: 'auth/callback', element: <Ch.Callback />, loader: callbackLoader },
  {
    path: 'admin',
    element: <Ch.Layout />,
    loader: layoutLoader(store),
    children: [
      { path: 'users', element: <Ch.Users /> },
      { path: 'factories', element: <Ch.Factories /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
