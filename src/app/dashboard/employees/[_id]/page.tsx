import { UpdateEmployee } from '@/components/forms/employee/update-employee'
import { fetchEmployee, fetchRolesList } from '@/lib/actions/employee.actions'

interface UpdateEmployeePageProps {
  params: {
    _id: string
  }
}

export default async function UpdateEmployeePage({
  params,
}: UpdateEmployeePageProps) {
  const employee = await fetchEmployee(params._id)
  const { roles } = await fetchRolesList()

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <UpdateEmployee employee={employee} roles={roles} />
      </div>
    </section>
  )
}
