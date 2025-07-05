import { Outlet } from 'react-router'
import { Sidebar } from './sidebar'

export default function HomeLayout() {
  return (
    <div className="min-h-screen text-sm flex">
      <Sidebar />
      <main className="flex-1">
        <header className="px-4 py-3">
          <h2>Header Title</h2>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
