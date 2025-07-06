import { Box, Inbox, Target } from 'lucide-react'
import { SideNav } from '../models/side-nav'

export const sideLinks: SideNav[] = [
  {
    name: 'General',
    href: '',
    icon: null,
    children: [
      {
        name: 'Messages',
        href: '/home',
        icon: <Inbox size={15} />,
      },
      {
        name: 'My Tasks',
        href: '/',
        icon: <Target size={15} />,
      },
    ]
  },
  {
    name: 'Your Projects',
    href: '',
    icon: null,
    children: [
      {
        name: 'Waredrop',
        href: '/',
        icon: <Box size={15} color='red'/>,
        children: [
          {
            name: 'Tasks',
            href: '/',
            icon: null,
          },
          {
            name: 'Epics',
            href: '/',
            icon: null,
          },
          {
            name: 'Members',
            href: '/',
            icon: null,
          },
          {
            name: 'sprints',
            href: '/',
            icon: null,
          },
        ]
      },
      {
        name: 'Taskmaster',
        href: '/',
        icon: <Box size={15} color='green'/>,
      },
    ]
  },
]
