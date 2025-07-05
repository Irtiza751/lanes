import { Outlet } from 'react-router'
import { Sidebar } from './sidebar'

export default function HomeLayout() {
  return (
    <div className="min-h-screen text-sm flex">
      <Sidebar />
      <main className="bg-secondary border m-2 rounded-md flex-1 border">
        <header className="px-4 py-3">
          <h2>Header Title</h2>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
