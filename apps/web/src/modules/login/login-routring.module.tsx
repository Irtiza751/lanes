import { redirect, RouteObject } from 'react-router'
import Login from '.'
// import { api } from "@/api";
import { LocalStorage } from '@/shared/lib/classes/LocalStorage'

export const loginRoutes: RouteObject = {
  path: 'login',
  index: true,
  element: <Login />,
  loader: () => {
    const token = LocalStorage.getItem<string>('token')
    if (token) {
      return redirect('/home')
    }
  },
}
