'use server'

import { revalidatePath } from 'next/cache'
// import { v4 as uuid } from 'uuid'
import uuid from 'uuid-mongodb'

import City from '@/lib/models/city.model'

import { connectToDB } from '../mongoose'

interface ICreateCityParams {
  name: string
  path: string
}

export async function createCity({ name, path }: ICreateCityParams) {
  try {
    connectToDB()

    await City.create({
      id: uuid.v4(),
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
