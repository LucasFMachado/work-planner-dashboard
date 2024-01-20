import { ReactElement } from 'react'

export type SidebarLinkType = {
  title: string
  path: string
  icon: ReactElement
}

export type SidebarCategoryType = {
  title: string
  links: SidebarLinkType[]
}
