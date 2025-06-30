import { RouteObject } from 'react-router'
import DashboardLayout from '.'
import { Projects } from './components/projects'
import { AuthGuard } from '@/shared/lib/classes/AuthGuard'

export const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  Component: DashboardLayout,
  children: [
    {
      index: true,
      element: <div>
        <h2>Dashboard</h2>
        <p>It will display all the projects as cards</p>
      </div>,
      loader: AuthGuard.resolve,
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
