import { UpdateProtocol } from '@/components/forms/protocol/update-protocol'
import { fetchCitiesList } from '@/lib/actions/city.actions'
import { fetchProtocol } from '@/lib/actions/protocol.actions'

interface UpdateTaskPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateProtocolPage({
  params,
}: UpdateTaskPageProps) {
  const protocol = await fetchProtocol(params._id)
  const { cities } = await fetchCitiesList()

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <UpdateProtocol protocol={protocol} cities={cities} />
      </div>
    </section>
  )
}
