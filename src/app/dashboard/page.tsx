import { fetchDashboardData } from '@/lib/actions/dashboard-data'

export default async function DashboardPage() {
  const { totalProtocols, cityProtocols } = await fetchDashboardData()

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="flex gap-2 flex-wrap">
        <div className="flex flex-col items-center justify-center gap-2 p-2 rounded-md h-20 min-w-40 bg-neutral-50 drop-shadow">
          <p className="text-4xl text-blue-500">{totalProtocols}</p>
          <p className="text-xs">Opened protocols</p>
        </div>
        <div className="bg-blue-300 drop-shadow w-[1px] hidden sm:block my-2" />
        {cityProtocols.map(protocol => (
          <div
            key={protocol.city}
            className="flex flex-col items-center justify-center gap-2 p-2 rounded-md h-20 min-w-40 bg-neutral-50 drop-shadow"
          >
            <p className="text-4xl text-blue-500">{protocol.protocolsCount}</p>
            <p className="text-xs">
              Protocols in <span className="font-bold">{protocol.city}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
