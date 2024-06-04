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
    <div className="flex items-center p-3 rounded-md bg-neutral-50 drop-shadow">
      <div className="font-extrabold capitalize">{pagePath}</div>
    </div>
  )
}
