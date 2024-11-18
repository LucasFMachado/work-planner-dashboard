import { TableActions } from '@/components/shared/TableActions'
import { TableOperations } from '@/components/shared/TableOperations'
import { TablePagination } from '@/components/shared/TablePagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteCity, fetchCities } from '@/lib/actions/city.actions'
import { INITIAL_PAGE, Routes } from '@/lib/constants'

interface CitiesPageProps {
  searchParams: {
    page: string
  }
}

export default async function CitiesPage({
  searchParams: { page },
}: CitiesPageProps) {
  const currentPage = Number(page) || INITIAL_PAGE
  const { cities, hasNextPage } = await fetchCities(currentPage)

  const handleDelete = async (id: string, path: string) => {
    'use server'
    await deleteCity({ cityId: id, path })
  }

  return (
    <section className="main-section">
      <div className="w-full mb-2">
        <TableOperations route={Routes.cities} />
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
            {cities?.map(city => (
              <TableRow key={city._id.toString()} className="table-row-body">
                <TableCell className="table-cell">{city.name}</TableCell>
                <TableCell className="table-cell w-20">
                  <TableActions
                    handleDelete={handleDelete}
                    id={city._id.toString()}
                    route={Routes.cities}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          route={Routes.cities}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </section>
  )
}
