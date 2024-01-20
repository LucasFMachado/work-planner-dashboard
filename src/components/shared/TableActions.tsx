'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    <div className="flex flex-col sm:flex-row w-full gap-2">
      <Link
        href={`/dashboard/protocols/${protocolId}`}
        className="flex items-center w-full"
      >
        <Button className="flex items-center w-full bg-violet-700 hover:bg-violet-600 text-slate-200 transition-all h-6 px-1 text-[10px] uppercase">
          Update
        </Button>
      </Link>
      <Button
        onClick={() => handleDelete(protocolId)}
        className="flex items-center w-full bg-red-600 hover:bg-red-500 text-slate-200 transition-all h-6 px-1 text-[10px] uppercase"
      >
        Delete
      </Button>
    </div>
  )
}
