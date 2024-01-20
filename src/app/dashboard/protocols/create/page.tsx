import { CreateProtocol } from '@/components/forms/protocol/CreateProtocol'

export default function CrateTaskPage() {
  return (
    <section className="min-h-full flex flex-col items-center gap-2 m-4">
      <div className="rounded-md w-4/5">
        <CreateProtocol />
      </div>
    </section>
  )
}
