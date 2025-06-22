import { Outlet } from 'react-router'
import { Link } from 'react-router'
import { Navbar } from './components/navbar'
import { sidebarLinks } from './constants/sidbar-links'

export default function DashboardLayout() {
  return (
    <main className='relative'>
      <header className='sticky top-0 z-10 bg-background'>
        <Navbar />
      </header>
      <div className='grid grid-cols-6 min-h-dvh'>
        <aside className='border-r h-full text-sm'>
          <nav className='px-2 py-4'>
            {sidebarLinks.map(link => {
              return (
                <Link className='flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded' to={link.href}>
                  {link.icon}
                  {link.title}
                </Link>
              )
            })}
          </nav>
        </aside>
        <div className='col-span-5 p-4'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}
