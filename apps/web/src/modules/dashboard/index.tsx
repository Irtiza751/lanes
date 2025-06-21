import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <main className="grid grid-cols-6 container mx-auto px-4 pt-8">
      <aside>
        <nav>
          <p>Sidebar</p>
        </nav>
      </aside>
      <div className='col-span-5'>
        <Outlet />
      </div>
    </main>
  )
}
