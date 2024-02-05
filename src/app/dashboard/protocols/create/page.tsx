import { CreateProtocol } from '@/components/forms/protocol/CreateProtocol'
import { fetchCitiesList } from '@/lib/actions/city.actions'

export default async function CrateProtocolPage() {
  const { cities } = await fetchCitiesList()

  return (
    <section className="min-h-full flex flex-col items-center gap-2 m-4">
      <div className="rounded-md w-4/5">
        <CreateProtocol cities={cities} />
      </div>
    </section>
  )
}
