import { redirect, RouteObject } from "react-router";
import Home from ".";
import { api } from "@/api";
import { LocalStorage } from "@/shared/lib/classes/LocalStorage";

export const homeRoutes: RouteObject = {
  path: '',
  index: true,
  element: <Home />,
  loader: async () => {
    const token = LocalStorage.getItem<string>('token');
    const sessionId = LocalStorage.getItem<number>('sessionId');
    if(token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      try {
        const res = await api.get(`/users/${sessionId}`);
        console.log(res);
        return res.data;
      } catch (error) {
        LocalStorage.delete('id', 'token');
        return redirect('/auth/login')
      }
    }
    return redirect('/auth/login')
  },
}