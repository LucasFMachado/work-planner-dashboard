'use client'

import { usePathname } from 'next/navigation'

export function Navbar() {
  const path = usePathname()

  return (
    <div className="flex items-center p-3 rounded-md mb-4 bg-slate-900">
      <div className="text-slate-200 font-semibold capitalize">
        {path.split('/').pop()}
      </div>
    </div>
  )
}
