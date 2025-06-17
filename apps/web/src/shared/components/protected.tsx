import { useAuth } from '@/providers/auth.provider'
import { Navigate, useLocation } from 'react-router'

const Protected = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const user = useAuth()

  return user ? children : <Navigate to="/auth/login" state={{ from: location }} replace />
}

export default Protected
