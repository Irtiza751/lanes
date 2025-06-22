// import { Outlet } from 'react-router'
import { Navbar } from './components/navbar'

export default function DashboardLayout() {
  return (
    <main className="grid grid-cols-6">
      <header className='col-span-6'>
        <Navbar />
      </header>
      {/* <aside>
        <nav>
          <p>Sidebar</p>
        </nav>
      </aside> */}
      {/* <div className='col-span-5'>
        <Outlet />
      </div> */}
    </main>
  )
}
