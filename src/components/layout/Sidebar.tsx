import Image from 'next/image'
import { MdLogout } from 'react-icons/md'

import { sidebarCategories } from '@/lib/constants'

import { SidebarLink } from './SidebarLink'

export function Sidebar() {
  return (
    <div className="sticky top-10 h-screen p-5 overflow-x-auto text-neutral-800">
      <div className="flex items-center gap-2 mb-5">
        <Image
          src="/images/astronaut.png"
          alt="Avatar image"
          width={35}
          height={35}
          className="rounded-full object-cover border border-neutral-800"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Lucas Machado</span>
          <span className="text-xs text-neutral-400 font-normal">
            Administrator
          </span>
        </div>
      </div>
      <ul className="list-none">
        {sidebarCategories.map(category => (
          <li key={category.title} className="font-extrabold text-xs my-3">
            <span className="">{category.title}</span>
            {category.links.map(link => (
              <SidebarLink key={link.path} link={link} />
            ))}
          </li>
        ))}
      </ul>
      <button className="w-full font-medium text-xs flex items-center gap-2 p-4 my-1 rounded-md border-none bg-none hover:bg-tertiary-background">
        <MdLogout />
        Logout
      </button>
    </div>
  )
}
