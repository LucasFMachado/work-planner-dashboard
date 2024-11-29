import { CreateEmployee } from '@/components/forms/employee/create-employee'
import { fetchRolesList } from '@/lib/actions/employee.actions'

export default async function CrateEmployeePage() {
  const { roles } = await fetchRolesList()

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <CreateEmployee roles={roles} />
      </div>
    </section>
  )
}
