import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <div className="flex-1 max-w-60 bg-slate-900">
        <Sidebar />
      </div>
      <div className="w-3/4 p-5">
        <Navbar />
        {children}
      </div>
    </div>
  )
}
