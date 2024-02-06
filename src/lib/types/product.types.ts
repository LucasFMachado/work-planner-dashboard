import { ProductUnitEntity } from './product-unit.types'

export type ProductEntity = {
  _id: string
  name: string
  productUnit: ProductUnitEntity
  active: boolean
  createdAt: Date
  deleted: boolean
  deletedAt?: Date
}

export type FetchProductsReturn = {
  products: ProductEntity[]
  hasNextPage: boolean
}

export type CreateProductParams = {
  name: string
  productUnitId: string
  path: string
}

export type UpdateProductParams = {
  productId: string
  name: string
  productUnitId: string
  path: string
}

export type DeleteProductParams = {
  productId: string
  path: string
}
