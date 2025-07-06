import { Inbox } from 'lucide-react'
import { SideNav } from '../models/side-nav'

export const sideLinks: SideNav[] = [
  {
    name: 'Messages',
    herf: '/home',
    icon: <Inbox size={15} />,
  },
]
