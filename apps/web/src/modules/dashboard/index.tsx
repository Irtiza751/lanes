import { Outlet } from 'react-router'
import { Navbar } from './components/navbar'
import { Sidebar } from './components/sidebar'

export default function DashboardLayout() {
  return (
    <main className="relative">
      <header className="sticky top-0 z-10 bg-background">
        <Navbar />
      </header>
      <div className="grid grid-cols-6 min-h-dvh">
        <Sidebar />
        <div className="col-span-5 p-4">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
