import { RouteObject } from 'react-router'
import DashboardLayout from '.'
import { Projects } from './components/projects'

export const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  Component: DashboardLayout,
  children: [
    {
      index: true,
      element: <div>Dashboard</div>,
    },
    {
      path: 'projects',
      element: <Projects />,
    },
    {
      path: 'kanban',
      element: <div>Kanban</div>,
    },
    {
      path: 'tasks',
      element: <div>Tasks</div>,
    },
    {
      path: 'members',
      element: <div>Members</div>,
    },
    {
      path: 'plans',
      element: <div>Plans</div>,
    },
  ],
}
