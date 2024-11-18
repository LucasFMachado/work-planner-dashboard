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
import { deleteProtocol, fetchProtocols } from '@/lib/actions/protocol.actions'
import { INITIAL_PAGE, Routes } from '@/lib/constants'
import { formatProotcol } from '@/lib/utils'

interface ProtocolsPageProps {
  searchParams: {
    page: string
  }
}

export default async function ProtocolsPage({
  searchParams: { page },
}: ProtocolsPageProps) {
  const currentPage = Number(page) || INITIAL_PAGE
  const { protocols, hasNextPage } = await fetchProtocols(currentPage)

  const handleDelete = async (id: string, path: string) => {
    'use server'
    await deleteProtocol({ protocolId: id, path })
  }

  return (
    <section className="main-section">
      <div className="w-full mb-2">
        <TableOperations route={Routes.protocols} />
      </div>
      <div className="w-full table">
        <Table className="table">
          <TableHeader>
            <TableRow className="table-row-head">
              <TableHead className="table-head w-28">Number</TableHead>
              <TableHead className="table-head">Requestor</TableHead>
              <TableHead className="table-head">City</TableHead>
              <TableHead className="table-head"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protocols?.map(protocol => (
              <TableRow
                key={protocol._id.toString()}
                className="table-row-body"
              >
                <TableCell className="table-cell w-28">
                  {formatProotcol(protocol.number)}
                </TableCell>
                <TableCell className="table-cell">
                  {protocol.requestor}
                </TableCell>
                <TableCell className="table-cell">
                  {protocol.city.name}
                </TableCell>
                <TableCell className="table-cell w-20">
                  <TableActions
                    handleDelete={handleDelete}
                    route={Routes.protocols}
                    id={protocol._id.toString()}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          route={Routes.protocols}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </section>
  )
}
