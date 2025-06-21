import { redirect, RouteObject } from 'react-router'
import DashboardLayout from '.'
import { Projects } from './components/projects'

export const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  Component: DashboardLayout,
  children: [
    {
      index: true,
      loader: () => redirect('/dashboard/projects')
    },
    {
      path: 'projects',
      element: <Projects />,
    },
  ],
}
