import { Logo } from '@/shared/components/ui/logo'
import { Separator } from '@/shared/components/ui/seperator'
import {
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  Files,
  Folder,
  FolderArchive,
  Home,
  PanelLeftClose,
  Users,
} from 'lucide-react'
import { Link } from 'react-router'

const menus = [
  {
    name: 'General',
    href: '',
    icon: '',
    children: [
      {
        name: 'Home',
        href: '/home',
        icon: <Home size={15} />, // main home page, with project stats etc..
      },
      {
        name: 'My Tasks',
        href: '/tasks',
        icon: <CheckCircle size={15} />, // list of task assigned to the logedin in user
      },
      {
        name: 'Docments',
        href: '/documents',
        icon: <Files size={15} />, // project specific documentation
      },
    ],
  },
  {
    name: 'My Workspace', // this should be the active workspace name
    href: '',
    icon: '',
    children: [
      {
        name: 'Teams',
        href: '/teams',
        icon: <Users size={15} />, // table of team member management on a project(s)
      },
      {
        name: 'Archive',
        href: '/archive',
        icon: <FolderArchive size={15} />, // list archived tasks
      },
      {
        name: 'Projects',
        href: '/projects', // list of all projects assigned to you.
        icon: <Folder size={15} />,
      },
    ],
  },
]

export function Sidebar() {
  return (
    <aside className="min-h-screen inline-block w-2xs bg-secondary p-4">
      <div className="flex justify-between items-center mb-5">
        <Logo size={26} />
      </div>
      <nav>
        <ul>
          {menus.map((menu) => (
            <li key={menu.name} className="mb-2">
              <div className="flex items-center mb-2">
                <span className="flex-1 uppercase text-xs text-muted-foreground">{menu.name}</span>
                <ChevronDown size={12} className="text-muted-foreground" />
              </div>

              {menu.children &&
                menu.children.map((item) => (
                  <Link
                    key={item.name}
                    className="flex items-center gap-2 py-2 px-1"
                    to={item.href}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              <Separator orientation="horizontal" />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
