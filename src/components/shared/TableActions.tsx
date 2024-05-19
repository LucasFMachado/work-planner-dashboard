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
    <div className="flex flex-col items-center sm:flex-row gap-1">
      <Link href={`/dashboard/${route}/${id}`}>
        <Button className="text-blue-600 hover:text-neutral-50 transition-all text-base h-full w-fit p-2">
          <FaPen />
        </Button>
      </Link>
      <Button
        onClick={() => handleDelete(id, pathname)}
        className="text-red-500 hover:text-neutral-50 transition-all text-base h-full w-fit p-2"
      >
        <FaTrashAlt />
      </Button>
    </div>
  )
}
