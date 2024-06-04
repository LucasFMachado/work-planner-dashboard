import { CreateProduct } from '@/components/forms/product/CreateProduct'
import { fetchProductUnitsList } from '@/lib/actions/product-unit.actions'

export default async function CrateProductPage() {
  const { productUnits } = await fetchProductUnitsList()

  return (
    <section className="form-section">
      <div className="rounded-md w-4/5">
        <CreateProduct productUnits={productUnits} />
      </div>
    </section>
  )
}
