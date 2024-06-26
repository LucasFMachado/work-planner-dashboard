import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <div className="flex-1 max-w-60 bg-neutral-50 drop-shadow">
        <Sidebar />
      </div>
      <div className="w-3/4 p-5 h-vh flex flex-col gap-10">
        <Navbar />
        {children}
      </div>
    </div>
  )
}
