'use server'

import { revalidatePath } from 'next/cache'

import City from '@/lib/models/city.model'

import { connectToDB } from '../mongoose'
import { CreateCityParams, FetchCitiesListReturn } from '../types/city.types'

export async function createCity({ name, path }: CreateCityParams) {
  try {
    connectToDB()

    await City.create({
      protocol: 0,
      name,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to create city: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchCitiesList(): Promise<FetchCitiesListReturn> {
  try {
    connectToDB()

    const cities = await City.find().select('_id name')

    const citiesReturn = cities.map(city => ({
      label: city.name,
      value: String(city._id),
    }))

    return { cities: citiesReturn }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch protocols: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
