import { api } from '@/api';
import { LocalStorage } from './LocalStorage'
import { redirect } from 'react-router'

export class AuthGuard {
  static async resolve() {
    const token = LocalStorage.getItem<string>('token');
    const sessionId = LocalStorage.getItem<number>('sessionId');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      try {
        const res = await api.get(`/users/${sessionId}`);
        return res.data;
      } catch (error) {
        LocalStorage.delete('id', 'token');
        return redirect('/auth/login')
      }
    }
    return redirect('/auth/login')
  }
}
