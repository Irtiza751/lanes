import { Box, Inbox, ListTodo, RefreshCcwDot, Split, Target, Users } from 'lucide-react'
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
        options: [
          {
            name: 'Settings',
            href: '/',
            icon: null,
          }
        ],
        children: [
          {
            name: 'Tasks',
            href: '/',
            icon: <ListTodo size={15} />,
          },
          {
            name: 'Epics',
            href: '/',
            icon: <Split size={15} />,
          },
          {
            name: 'Members',
            href: '/',
            icon: <Users size={14}/>,
          },
          {
            name: 'sprints',
            href: '/',
            icon: <RefreshCcwDot size={15}/>,
          },
        ]
      },
      {
        name: 'Taskmaster',
        href: '/',
        icon: <Box size={15} color='green'/>,
        options: [
          {
            name: 'Settings',
            href: '/',
            icon: null,
          }
        ],
        children: [
          {
            name: 'Tasks',
            href: '/',
            icon: <ListTodo size={15} />,
          },
          {
            name: 'Epics',
            href: '/',
            icon: <Split size={15} />,
          },
          {
            name: 'Members',
            href: '/',
            icon: <Users size={14}/>,
          },
          {
            name: 'sprints',
            href: '/',
            icon: <RefreshCcwDot size={15}/>,
          },
        ]
      },
    ]
  },
]
