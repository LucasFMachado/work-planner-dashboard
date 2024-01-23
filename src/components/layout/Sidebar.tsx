import Image from 'next/image'
import { MdLogout } from 'react-icons/md'

import { sidebarCategories } from '@/lib/constants'

import { SidebarLink } from './SidebarLink'

export function Sidebar() {
  return (
    <div className="sticky top-10 h-screen p-5 overflow-x-auto">
      <div className="flex items-center gap-5 mb-5">
        <Image
          src="/images/astronaut.png"
          alt="Avatar image"
          width={35}
          height={35}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col font-medium">
          <span>Lucas Machado</span>
          <span className="text-xs text-slate-400">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {sidebarCategories.map(category => (
          <li
            key={category.title}
            className="text-slate-200 font-bold text-xs my-3"
          >
            <span className="">{category.title}</span>
            {category.links.map(link => (
              <SidebarLink key={link.path} link={link} />
            ))}
          </li>
        ))}
      </ul>
      <button className="w-full text-slate-200 font-bold text-xs flex items-center gap-2 p-4 my-1 rounded-md border-none bg-none hover:bg-tertiary-background">
        <MdLogout />
        Logout
      </button>
    </div>
  )
}
