import { api } from '@/api'
import { LocalStorage } from '@/shared/lib/classes/LocalStorage'
import { createContext, useContext } from 'react'

type User = {
  id: number
  name: string
  email: string
}

const AuthContext = createContext<User | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = LocalStorage.getItem('token')
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  // This is where you would typically fetch the user data from an API or authentication service
  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@email.com',
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
