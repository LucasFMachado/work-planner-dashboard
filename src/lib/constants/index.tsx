import { FaBoxes, FaChartBar, FaMapMarkerAlt, FaWrench } from 'react-icons/fa'
import { LuRuler } from 'react-icons/lu'
import {
  MdAnalytics,
  MdHelpCenter,
  MdOutlineSettings,
  MdPeople,
  MdWork,
} from 'react-icons/md'

import { SidebarCategoryType } from '@/lib/types/sidebar.types'

export const sidebarCategories: SidebarCategoryType[] = [
  {
    title: 'Pages',
    links: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <FaChartBar />,
      },
      {
        title: 'Product Units',
        path: '/dashboard/product-units',
        icon: <LuRuler />,
      },
      {
        title: 'Protocols',
        path: '/dashboard/protocols',
        icon: <FaWrench />,
      },
      {
        title: 'Products',
        path: '/dashboard/products',
        icon: <FaBoxes />,
      },
      {
        title: 'Cities',
        path: '/dashboard/cities',
        icon: <FaMapMarkerAlt />,
      },
    ],
  },
  {
    title: 'Analytics',
    links: [
      {
        title: 'Revenue',
        path: '/dashboard/revenue',
        icon: <MdWork />,
      },
      {
        title: 'Reports',
        path: '/dashboard/reports',
        icon: <MdAnalytics />,
      },
      {
        title: 'Teams',
        path: '/dashboard/teams',
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: 'User',
    links: [
      {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />,
      },
      {
        title: 'Help',
        path: '/dashboard/help',
        icon: <MdHelpCenter />,
      },
    ],
  },
]

export const INITIAL_PAGE = 1
export const INITIAL_PAGE_SIZE = 10

export enum Routes {
  protocols = 'protocols',
  products = 'products',
  protuctUnits = 'product-units',
  cities = 'cities',
}
