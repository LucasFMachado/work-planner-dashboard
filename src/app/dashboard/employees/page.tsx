import { TableActions } from '@/components/shared/table-actions'
import { TableOperations } from '@/components/shared/table-operations'
import { TablePagination } from '@/components/shared/table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteEmployee, fetchEmployees } from '@/lib/actions/employee.actions'
import { INITIAL_PAGE, Routes } from '@/lib/constants'

interface EmployeePageProps {
  searchParams: {
    page: string
  }
}

export default async function EmployeePage({
  searchParams: { page },
}: EmployeePageProps) {
  const currentPage = Number(page) || INITIAL_PAGE
  const { employees, hasNextPage } = await fetchEmployees(currentPage)

  const handleDelete = async (id: string, path: string) => {
    'use server'
    await deleteEmployee({ employeeId: id, path })
  }

  return (
    <section className="main-section">
      <div className="w-full">
        <div className="mb-2">
          <TableOperations route={Routes.employees} />
        </div>
        <div className="w-full table">
          <Table className="w-full max-w-full bg-transparent">
            <TableHeader>
              <TableRow className="table-row-head">
                <TableHead className="table-head">Name</TableHead>
                <TableHead className="table-head"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.map(employee => (
                <TableRow
                  key={employee._id.toString()}
                  className="table-row-body"
                >
                  <TableCell className="table-cell">{employee.name}</TableCell>
                  <TableCell className="table-cell w-20">
                    <TableActions
                      handleDelete={handleDelete}
                      id={employee._id.toString()}
                      route={Routes.employees}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            route={Routes.employees}
            currentPage={currentPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </section>
  )
}
