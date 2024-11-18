'use server'

import { revalidatePath } from 'next/cache'

import ProductUnit from '@/lib/models/producty-unit.model'

import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '../constants'
import { connectToDB } from '../mongoose'
import {
  CreateProductUnitParams,
  DeleteProductUnitParams,
  FetchProductUnitsListReturn,
  FetchProductUnitsReturn,
  ProductUnitEntity,
  UpdateProductUnitParams,
} from '../types/product-unit.types'

export async function fetchProductUnits(
  pageNumber = INITIAL_PAGE,
  pageSize = INITIAL_PAGE_SIZE,
): Promise<FetchProductUnitsReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const productUnits: ProductUnitEntity[] = await ProductUnit.find({
      deleted: false,
    })
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)

    const totalProductUnits = await ProductUnit.countDocuments({
      deleted: false,
    })
    const hasNextPage = totalProductUnits > skipAmount + productUnits.length

    return {
      productUnits,
      hasNextPage,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch product unit: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchProductUnit(
  productUnitId: string,
): Promise<ProductUnitEntity> {
  try {
    connectToDB()

    const productUnit = await ProductUnit.findById(productUnitId)

    return productUnit
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch product unit: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function createProductUnit({
  unit,
  name,
  path,
}: CreateProductUnitParams) {
  try {
    connectToDB()

    await ProductUnit.create({
      unit,
      name,
      active: true,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to create product unit: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function updateProductUnit({
  productUnitId,
  name,
  unit,
  path,
}: UpdateProductUnitParams) {
  try {
    connectToDB()

    await ProductUnit.findByIdAndUpdate(productUnitId, {
      name,
      unit,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to update product unit: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function deleteProductUnit({
  productUnitId,
  path,
}: DeleteProductUnitParams): Promise<void> {
  try {
    connectToDB()

    await ProductUnit.findByIdAndUpdate(productUnitId, {
      deleted: true,
      deletedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete product unit: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchProductUnitsList(): Promise<FetchProductUnitsListReturn> {
  try {
    connectToDB()

    const productUnits = await ProductUnit.find({
      deleted: false,
    }).select('_id name')

    const productUnitsReturn = productUnits.map(productUnit => ({
      label: productUnit.name,
      value: String(productUnit._id),
    }))

    return { productUnits: productUnitsReturn }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch product units: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
