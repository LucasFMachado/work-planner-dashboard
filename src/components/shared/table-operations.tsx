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
      <Button className="flex gap-2 items-center h-10 bg-blue hover:bg-blue-hover text-white py-2 px-4 rounded-md transition-all font-light">
        <FaPlusCircle />
        Create
      </Button>
    </Link>
  )
}
