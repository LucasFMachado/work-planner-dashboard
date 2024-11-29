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
import { deleteTeam, fetchTeams } from '@/lib/actions/team.actions'
import { INITIAL_PAGE, Routes } from '@/lib/constants'

interface TeamsPageProps {
  searchParams: {
    page: string
  }
}

export default async function TeamsPage({
  searchParams: { page },
}: TeamsPageProps) {
  const currentPage = Number(page) || INITIAL_PAGE
  const { teams, hasNextPage } = await fetchTeams(currentPage)

  const handleDelete = async (id: string, path: string) => {
    'use server'
    await deleteTeam({ teamId: id, path })
  }

  return (
    <section className="main-section">
      <div className="w-full">
        <div className="mb-2">
          <TableOperations route={Routes.teams} />
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
              {teams?.map(team => (
                <TableRow key={team._id.toString()} className="table-row-body">
                  <TableCell className="table-cell">{team.name}</TableCell>
                  <TableCell className="table-cell w-20">
                    <TableActions
                      handleDelete={handleDelete}
                      id={team._id.toString()}
                      route={Routes.teams}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            route={Routes.teams}
            currentPage={currentPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </section>
  )
}
