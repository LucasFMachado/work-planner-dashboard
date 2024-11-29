import { UpdateTeam } from '@/components/forms/team/update-team'
import { fetchTeam } from '@/lib/actions/team.actions'

interface UpdateCityPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateCityPage({ params }: UpdateCityPageProps) {
  const team = await fetchTeam(params._id)

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <UpdateTeam team={team} />
      </div>
    </section>
  )
}
