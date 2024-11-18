'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarLinkType } from '@/lib/types/sidebar.types'

interface SidebarLinkProps {
  link: SidebarLinkType
}

export function SidebarLink({ link }: SidebarLinkProps) {
  const path = usePathname()
  const isActivePath =
    path === link.path ||
    (path.includes(link.path) && link.path !== '/dashboard')

  return (
    <Link
      href={link.path}
      className={`flex items-center gap-2 p-4 my-1 rounded-md hover:bg-tertiary-background font-medium ${
        isActivePath
          ? 'border border-orange text-orange hover:border-orange-hover hover:text-orange-hover transition-all'
          : 'text-white'
      }`}
    >
      {link.icon}
      {link.title}
    </Link>
  )
}
