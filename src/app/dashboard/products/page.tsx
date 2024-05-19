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
import { deleteProduct, fetchProducts } from '@/lib/actions/product.actions'
import { INITIAL_PAGE } from '@/lib/constants'

interface ProductsPageProps {
  searchParams: {
    page: string
  }
}

export default async function ProductsPage({
  searchParams: { page },
}: ProductsPageProps) {
  const currentPage = Number(page) || INITIAL_PAGE
  const { products, hasNextPage } = await fetchProducts(currentPage)

  const handleDelete = async (id: string, path: string) => {
    'use server'
    await deleteProduct({ productId: id, path })
  }

  return (
    <section className="main-section">
      <div className="w-full mb-2">
        <TableOperations route="products" />
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
            {products?.map(product => (
              <TableRow key={product._id} className="table-row-body">
                <TableCell className="table-cell">{product.name}</TableCell>
                <TableCell className="table-cell">
                  {product.productUnit.name}
                </TableCell>
                <TableCell className="table-cell w-20">
                  <TableActions
                    handleDelete={handleDelete}
                    id={product._id}
                    route="products"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          route="products"
          currentPage={currentPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </section>
  )
}
