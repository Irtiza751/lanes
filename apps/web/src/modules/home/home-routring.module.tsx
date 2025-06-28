import { RouteObject } from 'react-router'
import Home from '.'
import { AuthGuard } from '@/shared/lib/classes/AuthGuard'

export const homeRoutes: RouteObject = {
  path: '',
  index: true,
  element: <Home />,
  loader: AuthGuard.resolve,
}
