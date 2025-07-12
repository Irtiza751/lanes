import {
  Box,
  Inbox,
  ListTodo,
  RefreshCcwDot,
  SquareTerminal,
  Target,
  UsersRound,
} from 'lucide-react'
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
        icon: <Inbox size={13} />,
      },
      {
        name: 'My Tasks',
        href: '/',
        icon: <Target size={13} />,
      },
      {
        name: 'Epics',
        href: '/',
        icon: <Box size={13} />,
      },
    ],
  },
  {
    name: 'Your Projects',
    href: '',
    icon: null,
    children: [
      {
        name: 'Waredrop',
        href: '/',
        icon: <SquareTerminal size={13} className="text-blue-500" />,
        options: [
          {
            name: 'Settings',
            href: '/',
            icon: null,
          },
        ],
        children: [
          {
            name: 'Tasks',
            href: '/tasks/1',
            icon: <ListTodo size={13} />,
          },
          {
            name: 'Epics',
            href: '/',
            icon: <Box size={13} />,
          },
          {
            name: 'Members',
            href: '/',
            icon: <UsersRound size={13} />,
          },
          {
            name: 'sprints',
            href: '/',
            icon: <RefreshCcwDot size={13} />,
          },
        ],
      },
      {
        name: 'Taskmaster',
        href: '/',
        icon: <SquareTerminal size={13} className="text-orange-500" />,
        options: [
          {
            name: 'Settings',
            href: '/',
            icon: null,
          },
        ],
        children: [
          {
            name: 'Tasks',
            href: '/tasks/2',
            icon: <ListTodo size={13} />,
          },
          {
            name: 'Epics',
            href: '/',
            icon: <Box size={13} />,
          },
          {
            name: 'Members',
            href: '/',
            icon: <UsersRound size={13} />,
          },
          {
            name: 'sprints',
            href: '/',
            icon: <RefreshCcwDot size={13} />,
          },
        ],
      },
    ],
  },
]
