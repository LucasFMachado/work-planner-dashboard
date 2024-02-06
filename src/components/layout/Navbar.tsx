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
    <div className="flex items-center p-3 rounded-md mb-4 bg-slate-900">
      <div className="text-slate-200 font-semibold capitalize">{pagePath}</div>
    </div>
  )
}
