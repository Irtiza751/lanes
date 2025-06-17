import { Guard } from '@/types/Guard'
import { LocalStorage } from './LocalStorage'
import { redirect } from '@tanstack/react-router'

class AuthGuard implements Guard {
  resolve(): boolean {
    const token = LocalStorage.getItem('auth')
    if (token) return true
    throw redirect({ to: '/login' })
  }
}

export const authGuard = new AuthGuard()
