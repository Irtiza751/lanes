import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './login'
import Home from './home'
import HomeLayout from '@/layouts/home.layout'
import AuthLayout from '@/layouts/auth.layout'
import Protected from '@/shared/components/protected'

const router = createBrowserRouter([
  {
    path: '',
    Component: HomeLayout,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
    ],
  },
  {
    path: 'auth',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        index: true,
        element: <Login />,
      },
    ],
  },
])

export default () => {
  return <RouterProvider router={router} />
}
