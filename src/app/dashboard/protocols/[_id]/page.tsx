import { UpdateProtocol } from '@/components/forms/protocol/UpdateProtocol'
import { fetchProtocol } from '@/lib/actions/protocol.actions'

interface UpdateTaskPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateTaskPage({ params }: UpdateTaskPageProps) {
  const protocol = await fetchProtocol(params._id)

  return (
    <section className="main-section">
      <h1 className="text-3xl text-slate-100">Update task:</h1>
      <p className="mt-2 text-xs font-thin text-slate-200">Create your task.</p>

      <div className="mt-4 bg-zinc-900 p-10 rounded-md lg:w-2/3">
        <UpdateProtocol protocol={protocol} />
      </div>
    </section>
  )
}
