'use client'

import Link from 'next/link'
import { FaPlusCircle } from 'react-icons/fa'

import { Button } from '../ui/button'

interface TableActionsProps {
  route: string
}

export function TableOperations({ route }: TableActionsProps) {
  return (
    <Link href={`/dashboard/${route}/create`}>
      <Button className="flex gap-2 items-center h-8 bg-emerald-500 hover:bg-emerald-600 text-neutral-50 transition-all">
        <FaPlusCircle />
        Create
      </Button>
    </Link>
  )
}
