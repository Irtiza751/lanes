import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './login'
import Home from './home'
import HomeLayout from '@/layouts/home.layout'
import AuthLayout from '@/layouts/auth.layout'
import Protected from '@/shared/components/protected'
import { loginRoutes } from './login/login-routring.module'
import { homeRoutes } from './home/home-routring.module'

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
    path: 'home',
    Component: HomeLayout,
    children: [
      homeRoutes
    ],
  },
  {
    path: 'auth',
    Component: AuthLayout,
    children: [
      loginRoutes,
    ],
  },
])

export default () => {
  return <RouterProvider router={router} />
}
