import Link from 'next/link'

import { TableActions } from '@/components/shared/TableActions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchProtocols } from '@/lib/actions/protocol.actions'
import { formatProotcol } from '@/lib/utils'

export default async function ProductsPage() {
  const { protocols } = await fetchProtocols(1, 30)

  return (
    <section className="main-section">
      <h1 className="mb-4">Protocols:</h1>
      <Link href="/dashboard/protocols/create">Create</Link>
      {protocols.length === 0 ? (
        <p>No protocols found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Number</TableHead>
              <TableHead>Requestor</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protocols.map(protocol => (
              <TableRow key={protocol._id}>
                <TableCell className="font-medium">
                  {formatProotcol(protocol.number)}
                </TableCell>
                <TableCell>{protocol.requestor}</TableCell>
                <TableCell>{protocol.cityId}</TableCell>
                <TableCell>
                  <TableActions protocolId={protocol._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}
