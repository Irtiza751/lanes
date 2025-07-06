import React from 'react'

export interface SideNav {
  name: string
  href: string
  icon: React.ReactNode
  children?: SideNav[]
}
