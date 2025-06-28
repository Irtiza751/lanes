import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/cn'
import { Bell, PanelLeftClose, Plus, Search, Settings } from 'lucide-react'
import { Link } from 'react-router'

interface NavbarProps extends Partial<HTMLDivElement> {}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={cn('border-b', className)}>
      <div className="flex items-center justify-between gap-2 container px-4 py-2 mx-auto">
        {/* logo and sidebar toggler */}
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <PanelLeftClose />
          </Button>
          <h4 className="text-xl">
            <Link className="font-semibold text-primary" to="/dashboard/projects">
              Taskmaster
            </Link>
          </h4>
        </div>
        {/* search and create task */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="w-full mx-4">
            <Input placeholder="Search" />
          </div>
          <Button title="Create task" size="sm">
            <Plus />
            <span>Create</span>
          </Button>
        </div>
        {/* settings and profile */}
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" title="Notifications">
            <Bell />
          </Button>
          <Button size="icon" variant="ghost" title="Settings">
            <Settings />
          </Button>

          <Avatar>
            <AvatarImage src="https://github.com/Irtiza751.png" />
            <AvatarFallback>MI</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}
