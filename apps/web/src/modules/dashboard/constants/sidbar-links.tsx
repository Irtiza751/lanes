import { CheckCircle, LayoutDashboard, Users } from 'lucide-react'

export const sidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={16} />,
  },
  {
    title: 'My Tasks',
    href: '/dashboard/tasks',
    icon: <CheckCircle size={16} />,
  },
  {
    title: 'Members',
    href: '/dashboard/members',
    icon: <Users size={16} />,
  },
]
