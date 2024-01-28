'use server'

import { revalidatePath } from 'next/cache'

import ProductUnit from '@/lib/models/producty-unit.model'

import { connectToDB } from '../mongoose'
import {
  CreateProductUnitParams,
  FetchProductUnitsListReturn,
} from '../types/product-unit.types'

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

export async function fetchProductUnitsList(): Promise<FetchProductUnitsListReturn> {
  try {
    connectToDB()

    const productUnits = await ProductUnit.find().select('_id name')

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
