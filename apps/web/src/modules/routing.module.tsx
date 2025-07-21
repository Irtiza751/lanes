import { createBrowserRouter, RouterProvider } from 'react-router'
import HomeLayout from '@/layouts/home.layout'
import AuthLayout from '@/layouts/auth.layout'
import { loginRoutes } from './login/login-routring.module'
import { homeRoutes } from './home/home-routring.module'
import { workspaceRoutes } from './workspace/workspace-routing.module'

const router = createBrowserRouter([
  {
    path: '',
    Component: HomeLayout,
    children: [homeRoutes],
  },
  {
    path: 'auth',
    Component: AuthLayout,
    children: [loginRoutes],
  },
  {
    path: 'workspace',
    children: [workspaceRoutes],
  },
])

export default () => {
  return <RouterProvider router={router} />
}
