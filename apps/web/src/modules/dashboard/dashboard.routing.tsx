import { RouteObject } from 'react-router'
import DashboardLayout from '.'
import { Projects } from './elements/projects'

export const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  Component: DashboardLayout,
  children: [
    {
      index: true,
      element: <Projects />,
    },
  ],
}
