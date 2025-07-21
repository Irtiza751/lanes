import { RouteObject } from 'react-router'
import { CreateWorkspace } from './components/create-workspace'

export const workspaceRoutes: RouteObject = {
  path: 'create',
  children: [
    {
      index: true,
      element: <CreateWorkspace />,
    },
  ],
}
