import { CreateProductUnit } from '@/components/forms/product-unit/CreateProductUnit'

export default function CreateProductUnitPage() {
  return (
    <section className="min-h-full flex flex-col items-center gap-2 m-4">
      <div className="rounded-md w-4/5">
        <CreateProductUnit />
      </div>
    </section>
  )
}
