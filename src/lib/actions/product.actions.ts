'use server'

import { revalidatePath } from 'next/cache'

import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '../constants'
import Product from '../models/product.model'
import ProductUnit from '../models/producty-unit.model'
import { connectToDB } from '../mongoose'
import {
  CreateProductParams,
  DeleteProductParams,
  FetchProductsReturn,
  ProductEntity,
  UpdateProductParams,
} from '../types/product.types'

export async function fetchProducts(
  pageNumber = INITIAL_PAGE,
  pageSize = INITIAL_PAGE_SIZE,
): Promise<FetchProductsReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const products: ProductEntity[] = await Product.find({ deleted: false })
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: 'productUnit',
        model: ProductUnit,
      })

    const totalProducts = await Product.countDocuments({ deleted: false })
    const hasNextPage = totalProducts > skipAmount + products.length

    return {
      products,
      hasNextPage,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch products: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchProduct(productId: string): Promise<ProductEntity> {
  try {
    connectToDB()

    const product = await Product.findById(productId)

    return product
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch product: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function createProduct({
  name,
  productUnitId,
  path,
}: CreateProductParams) {
  try {
    connectToDB()

    const productUnit = await ProductUnit.findById(productUnitId)

    if (!productUnit) {
      throw new Error('Product unit not found.')
    }

    await Product.create({
      name,
      productUnit: productUnitId,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to create product: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function updateProduct({
  productId,
  name,
  productUnitId,
  path,
}: UpdateProductParams) {
  try {
    connectToDB()

    const productUnit = await ProductUnit.findById(productUnitId)

    if (!productUnit) {
      throw new Error('Product unit not found.')
    }

    await Product.findByIdAndUpdate(productId, {
      name,
      productUnit: productUnitId,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to update product: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function deleteProduct({
  productId,
  path,
}: DeleteProductParams): Promise<void> {
  try {
    connectToDB()

    await Product.findByIdAndUpdate(productId, {
      deleted: true,
      deletedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete product: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
