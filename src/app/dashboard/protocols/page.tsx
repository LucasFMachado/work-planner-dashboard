import Link from 'next/link'
import { FaPlusCircle } from 'react-icons/fa'

import { TableActions } from '@/components/shared/TableActions'
import { Button } from '@/components/ui/button'
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
      <div className="w-full mb-2">
        <Link href="/dashboard/protocols/create">
          <Button className="flex gap-2 items-center h-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all">
            <FaPlusCircle />
            Create
          </Button>
        </Link>
      </div>
      <div className="w-full rounded-md bg-slate-950 border border-slate-700 text-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="table-row-head">
              <TableHead className="table-head w-28">Number</TableHead>
              <TableHead className="table-head">Requestor</TableHead>
              <TableHead className="table-head">City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protocols?.map(protocol => (
              <TableRow key={protocol._id} className="table-row-body">
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
                  <TableActions protocolId={protocol._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
