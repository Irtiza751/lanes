import { redirect, RouteObject } from 'react-router'
import Home from '.'
import { AuthGuard } from '@/shared/lib/classes/AuthGuard'
import HomeLayout from './components/layout'
import { tasksRoute } from './modules/tasks/tasks-routing.module'

export const homeRoutes: RouteObject = {
  path: '',
  Component: HomeLayout,
  children: [
    {
      index: true,
      loader: () => redirect('/home'),
    },
    {
      path: 'home',
      element: <Home />,
      loader: AuthGuard.resolve,
    },
    {
      path: ':workspace',
      children: [
        tasksRoute,
      ]
    }
  ],
}
