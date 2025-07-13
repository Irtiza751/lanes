import { RouteObject } from 'react-router'
import { AuthGuard } from '@/shared/lib/classes/AuthGuard'
import Tasks from '.'
import { TaskDetails } from './details'

export const tasksRoute: RouteObject = {
  path: 'tasks',
  children: [
    {
      index: true,
      element: <Tasks />,
      loader: AuthGuard.resolve,
    },
    {
      path: ':id',
      element: <TaskDetails />,
      loader: AuthGuard.resolve,
    },
  ],
}
