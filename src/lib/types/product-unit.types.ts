export type ProductUnitEntity = {
  _id: string
  name: string
  unit: string
  active: boolean
  createdAt: Date
  deleted: boolean
  deletedAt?: Date
}

export type FetchProductUnitsReturn = {
  productUnits: ProductUnitEntity[]
  hasNextPage: boolean
}

export type CreateProductUnitParams = {
  unit: string
  name: string
  path: string
}

export type UpdateProductUnitParams = {
  productUnitId: string
  name: string
  unit: string
  path: string
}

export type DeleteProductUnitParams = {
  productUnitId: string
  path: string
}

export type ProductUnitsListOption = {
  label: string
  value: string
}

export type FetchProductUnitsListReturn = {
  productUnits: ProductUnitsListOption[]
}
