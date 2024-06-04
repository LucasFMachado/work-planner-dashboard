import { CreateProtocol } from '@/components/forms/protocol/CreateProtocol'
import { fetchCitiesList } from '@/lib/actions/city.actions'

export default async function CrateProtocolPage() {
  const { cities } = await fetchCitiesList()

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <CreateProtocol cities={cities} />
      </div>
    </section>
  )
}
