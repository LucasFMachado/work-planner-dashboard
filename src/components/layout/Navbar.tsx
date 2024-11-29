'use client'

import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { handlePagePath } from '@/lib/utils'

export function Navbar() {
  const path = usePathname()
  const params = useParams()
  const [pagePath, setPagePath] = useState('')

  useEffect(() => {
    setPagePath(handlePagePath(params, path))
  }, [path, params])

  return (
    <div className="flex items-center p-4 rounded-md bg-background-secondary text-white drop-shadow">
      <div className="font-semibold capitalize">
        {pagePath.replaceAll('-', ' ')}
      </div>
    </div>
  )
}
