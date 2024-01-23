'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaPen, FaTrashAlt } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { deletedProtocol } from '@/lib/actions/protocol.actions'
interface TableActionsProps {
  protocolId: string
}

export function TableActions({ protocolId }: TableActionsProps) {
  const pathname = usePathname()

  const handleDelete = async (protocolId: string) => {
    await deletedProtocol({ protocolId, path: pathname })
  }

  return (
    <div className="flex flex-col items-center sm:flex-row gap-1">
      <Link href={`/dashboard/protocols/${protocolId}`}>
        <Button className="text-indigo-400 hover:text-indigo-500 transition-all text-base h-full w-fit p-2">
          <FaPen />
        </Button>
      </Link>
      <Button
        onClick={() => handleDelete(protocolId)}
        className="text-red-400 hover:text-red-500 transition-all text-base h-full w-fit p-2"
      >
        <FaTrashAlt />
      </Button>
    </div>
  )
}
