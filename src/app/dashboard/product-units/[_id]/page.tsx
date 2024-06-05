import { UpdateProductUnit } from '@/components/forms/product-unit/UpdateProductUnit'
import { fetchProductUnit } from '@/lib/actions/product-unit.actions'

interface UpdateTaskPageProps {
  params: {
    _id: string
  }
}

export default async function UpdateProductUnitPage({
  params,
}: UpdateTaskPageProps) {
  const productUnit = await fetchProductUnit(params._id)

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <UpdateProductUnit productUnit={productUnit} />
      </div>
    </section>
  )
}
