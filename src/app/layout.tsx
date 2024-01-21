import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin dashboard',
  description: 'An admin dashboard developed using NextJS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${robotoSlab.className} text-sm bg-slate-950 text-slate-200`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
