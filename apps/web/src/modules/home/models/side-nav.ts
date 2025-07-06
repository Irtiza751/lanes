import React from 'react'

export interface SideNav {
  name: string
  herf: string
  icon: React.ReactNode
  children?: SideNav[]
}
