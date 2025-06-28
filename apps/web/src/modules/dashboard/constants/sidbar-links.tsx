import {
  ChartGantt,
  CheckCircle,
  FolderOpenDot,
  LayoutDashboard,
  SquareKanban,
  Users,
} from 'lucide-react'

export const sidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={16} />,
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: <FolderOpenDot size={16} />,
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: <SquareKanban size={16} />,
  },
  {
    title: 'Tasks',
    href: '/dashboard/tasks',
    icon: <CheckCircle size={16} />,
  },
  {
    title: 'Members',
    href: '/dashboard/members',
    icon: <Users size={16} />,
  },
  {
    title: 'Plans',
    href: '/dashboard/plans',
    icon: <ChartGantt size={16} />,
  },
]
