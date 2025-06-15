import { Navigate, useLocation } from 'react-router'

const isAuthenticated = () => {
  // Replace this with your real auth logic
  return localStorage.getItem('token') !== null
}

const Protected = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  )
}

export default Protected
