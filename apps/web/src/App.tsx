import AppRoutes from './modules/routing.module'
import { AuthProvider } from './providers/auth.provider'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
