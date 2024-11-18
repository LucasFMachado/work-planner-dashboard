'use server'

import { revalidatePath } from 'next/cache'

import City from '@/lib/models/city.model'

import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '../constants'
import { connectToDB } from '../mongoose'
import {
  CityEntity,
  CreateCityParams,
  DeleteCityParams,
  FetchCitiesListReturn,
  FetchCitiesReturn,
  UpdateCityParams,
} from '../types/city.types'

export async function fetchCities(
  pageNumber = INITIAL_PAGE,
  pageSize = INITIAL_PAGE_SIZE,
): Promise<FetchCitiesReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const cities: CityEntity[] = await City.find({
      deleted: false,
    })
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)

    const totalCities = await City.countDocuments({
      deleted: false,
    })
    const hasNextPage = totalCities > skipAmount + cities.length

    return {
      cities,
      hasNextPage,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch city: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchCity(cityId: string): Promise<CityEntity> {
  try {
    connectToDB()

    const city = await City.findById(cityId)

    return city
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch city: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

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

export async function updateCity({ cityId, name, path }: UpdateCityParams) {
  try {
    connectToDB()

    await City.findByIdAndUpdate(cityId, {
      name,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to update city: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function deleteCity({
  cityId,
  path,
}: DeleteCityParams): Promise<void> {
  try {
    connectToDB()

    await City.findByIdAndUpdate(cityId, {
      deleted: true,
      deletedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete city: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchCitiesList(): Promise<FetchCitiesListReturn> {
  try {
    connectToDB()

    const cities = await City.find({
      deleted: false,
    }).select('_id name')

    const citiesReturn = cities.map(city => ({
      label: city.name,
      value: String(city._id),
    }))

    return { cities: citiesReturn }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch cities: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
