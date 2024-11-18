import { UpdateCity } from '@/components/forms/city/UpdateCity'
import { fetchCity } from '@/lib/actions/city.actions'

interface UpdateCityPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateCityPage({ params }: UpdateCityPageProps) {
  const city = await fetchCity(params._id)

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <UpdateCity city={city} />
      </div>
    </section>
  )
}
