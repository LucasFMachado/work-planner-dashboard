import { FaChartBar, FaMapMarkerAlt, FaTasks, FaWrench } from 'react-icons/fa'
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
        title: 'Tasks',
        path: '/dashboard/tasks',
        icon: <FaTasks />,
      },
      {
        title: 'Protocols',
        path: '/dashboard/protocols',
        icon: <FaWrench />,
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
