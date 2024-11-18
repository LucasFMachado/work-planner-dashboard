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
import {
  deleteProductUnit,
  fetchProductUnits,
} from '@/lib/actions/product-unit.actions'
import { INITIAL_PAGE, Routes } from '@/lib/constants'

interface ProductUnitsPageProps {
  searchParams: {
    page: string
  }
}

export default async function ProductUnitsPage({
  searchParams: { page },
}: ProductUnitsPageProps) {
  const currentPage = Number(page) || INITIAL_PAGE
  const { productUnits, hasNextPage } = await fetchProductUnits(currentPage)

  const handleDelete = async (id: string, path: string) => {
    'use server'
    await deleteProductUnit({ productUnitId: id, path })
  }

  return (
    <section className="main-section">
      <div className="w-full mb-2">
        <TableOperations route={Routes.protuctUnits} />
      </div>
      <div className="w-full table">
        <Table className="w-full max-w-full bg-transparent">
          <TableHeader>
            <TableRow className="table-row-head">
              <TableHead className="table-head">Name</TableHead>
              <TableHead className="table-head">Unit</TableHead>
              <TableHead className="table-head"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productUnits?.map(productUnit => (
              <TableRow
                key={productUnit._id.toString()}
                className="table-row-body"
              >
                <TableCell className="table-cell">{productUnit.name}</TableCell>
                <TableCell className="table-cell">{productUnit.unit}</TableCell>
                <TableCell className="table-cell w-20">
                  <TableActions
                    handleDelete={handleDelete}
                    id={productUnit._id.toString()}
                    route={Routes.protuctUnits}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          route={Routes.protuctUnits}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </section>
  )
}
