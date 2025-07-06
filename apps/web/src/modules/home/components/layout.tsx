import { Outlet } from 'react-router'
import { Sidebar } from './sidebar'
import { Button } from '@/shared/components/ui/button'
import { PanelLeft, Plus, Search } from 'lucide-react'

export default function HomeLayout() {
  return (
    <div className="dark:bg-background bg-secondary min-h-screen text-sm flex">
      <Sidebar />
      <main className="dark:bg-secondary bg-background border m-2 rounded-lg shadow-sm flex-1 border">
        <header className="flex gap-2 px-4 py-2 border-b">
          <div className='flex-1 flex items-center gap-2'>
            <Button size='icon' variant='outline' className='shadow-none'>
              <PanelLeft size={20} className='text-lg' />
            </Button>
            <h2 className='text-md font-semibold'>Home</h2>
          </div>
          <div className='flex gap-2'>
            <Button size='icon' variant='outline' className='shadow-none'>
              <Search />
            </Button>
            <Button size='sm' className='shadow-none'>
              <Plus />
              <span>Create</span>
            </Button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
