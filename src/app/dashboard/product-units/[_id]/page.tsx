import { UpdateProductUnit } from '@/components/forms/product-unit/update-product-unit'
import { fetchProductUnit } from '@/lib/actions/product-unit.actions'

interface UpdateProductUnitPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateProductUnitPage({
  params,
}: UpdateProductUnitPageProps) {
  const productUnit = await fetchProductUnit(params._id)

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <UpdateProductUnit productUnit={productUnit} />
      </div>
    </section>
  )
}
