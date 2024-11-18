'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaPen, FaTrashAlt } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

interface TableActionsProps {
  route: string
  id: string
  handleDelete: (id: string, path: string) => Promise<void>
}

export function TableActions({ id, route, handleDelete }: TableActionsProps) {
  const pathname = usePathname()

  return (
    <div className="flex space-x-2">
      <Link href={`/dashboard/${route}/${id}`}>
        <Button className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-3 rounded-md">
          <FaPen />
        </Button>
      </Link>
      <Button
        onClick={() => handleDelete(id, pathname)}
        className="bg-red hover:bg-red-hover text-white py-1 px-3  rounded-md"
      >
        <FaTrashAlt />
      </Button>
    </div>
  )
}
