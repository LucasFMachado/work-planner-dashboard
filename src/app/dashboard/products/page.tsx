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
import { fetchProducts } from '@/lib/actions/product.actions'
import { fetchProtocols } from '@/lib/actions/protocol.actions'
import { formatProotcol } from '@/lib/utils'

export default async function ProductsPage() {
  const { products } = await fetchProducts(1, 30)

  return (
    <section className="main-section">
      <div className="w-full mb-2">
        <Link href="/dashboard/products/create">
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
              <TableHead className="table-head">Name</TableHead>
              <TableHead className="table-head">Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map(product => (
              <TableRow key={product._id} className="table-row-body">
                <TableCell className="table-cell">{product.name}</TableCell>
                <TableCell className="table-cell">
                  {product.productUnit.name}
                </TableCell>
                <TableCell className="table-cell w-20">
                  <TableActions protocolId={product._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
