import { UpdateProtocol } from '@/components/forms/protocol/UpdateProtocol'
import { fetchCitiesList } from '@/lib/actions/city.actions'
import { fetchProtocol } from '@/lib/actions/protocol.actions'

interface UpdateTaskPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateProductPage({
  params,
}: UpdateTaskPageProps) {
  const protocol = await fetchProtocol(params._id)
  const { cities } = await fetchCitiesList()

  return (
    <section className="min-h-full flex flex-col items-center gap-2 m-4">
      <div className="rounded-md w-4/5">
        <UpdateProtocol protocol={protocol} cities={cities} />
      </div>
    </section>
  )
}
