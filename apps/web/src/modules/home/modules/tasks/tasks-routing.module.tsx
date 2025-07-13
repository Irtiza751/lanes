import { RouteObject } from 'react-router'
import { AuthGuard } from '@/shared/lib/classes/AuthGuard'
import Tasks from '.'

export const tasksRoute: RouteObject = {
  path: 'tasks',
  children: [
    {
      path: ':id',
      element: <Tasks />,
      loader: AuthGuard.resolve,
    },
  ],
}
