import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

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
        className={`${inter.className} text-sm bg-slate-950 text-slate-200`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
