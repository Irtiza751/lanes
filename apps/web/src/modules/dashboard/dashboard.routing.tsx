import { RouteObject } from 'react-router'
import DashboardLayout from '.'
import { Projects } from './components/projects'

export const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  Component: DashboardLayout,
  children: [
    {
      index: true,
      element: <div>Dashboard</div>
    },
    {
      path: 'projects',
      element: <Projects />,
    },
  ],
}
