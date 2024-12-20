import { UpdateProduct } from '@/components/forms/product/update-product'
import { fetchProduct } from '@/lib/actions/product.actions'
import { fetchProductUnitsList } from '@/lib/actions/product-unit.actions'

interface UpdateTaskPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateProductPage({
  params,
}: UpdateTaskPageProps) {
  const product = await fetchProduct(params._id)
  const { productUnits } = await fetchProductUnitsList()

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <UpdateProduct product={product} productUnits={productUnits} />
      </div>
    </section>
  )
}
