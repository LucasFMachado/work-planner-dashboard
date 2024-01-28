'use server'

import { revalidatePath } from 'next/cache'

import Protocol from '@/lib/models/protocol.model'
import {
  ChangeProtocolStatus,
  CreateProtocolParams,
  FetchProtocolsReturn,
  ProtocolEntity,
  UpdateProtocolParams,
} from '@/lib/types/protocol.types'

import City from '../models/city.model'
import { connectToDB } from '../mongoose'

export async function fetchProtocols(
  pageNumber = 1,
  pageSize = 15,
): Promise<FetchProtocolsReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const protocols: ProtocolEntity[] = await Protocol.find({ deleted: false })
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: 'city',
        model: City,
      })

    const totalProtocols = await Protocol.countDocuments({ deleted: false })
    const hasNextPage = totalProtocols > skipAmount + protocols.length

    return {
      protocols,
      hasNextPage,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch protocols: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchProtocol(
  protocolId: string,
): Promise<ProtocolEntity> {
  try {
    connectToDB()

    const protocol = await Protocol.findById(protocolId)

    return protocol
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch protocol: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function createProtocol({
  requestor,
  address,
  cityId,
  description,
  path,
}: CreateProtocolParams) {
  try {
    connectToDB()

    const city = await City.findOneAndUpdate(
      { _id: cityId },
      { $inc: { protocol: 1 } },
      { new: true },
    )

    if (!city) {
      throw new Error('City not found.')
    }

    await Protocol.create({
      number: city.protocol,
      requestor,
      address,
      city: cityId,
      description,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to create protocol: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function updateProtocol({
  protocolId,
  requestor,
  address,
  cityId,
  description,
  completed = false,
  path,
}: UpdateProtocolParams) {
  try {
    connectToDB()

    const city = await City.findOneAndUpdate(
      { _id: cityId },
      { $inc: { protocol: 1 } },
      { new: true },
    )

    if (!city) {
      throw new Error('City not found.')
    }

    await Protocol.findByIdAndUpdate(protocolId, {
      requestor,
      address,
      city: cityId,
      description,
      completed,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to update protocol: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function completeProtocol({
  protocolId,
  path,
}: ChangeProtocolStatus): Promise<void> {
  try {
    connectToDB()

    await Protocol.findByIdAndUpdate(protocolId, {
      completed: true,
      completedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to complete protocol: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function deletedProtocol({
  protocolId,
  path,
}: ChangeProtocolStatus): Promise<void> {
  try {
    connectToDB()

    await Protocol.findByIdAndUpdate(protocolId, {
      deleted: true,
      deletedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete protocol: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function toggleImportantProtocol({
  protocolId,
  path,
}: ChangeProtocolStatus): Promise<void> {
  try {
    connectToDB()

    await Protocol.findByIdAndUpdate(protocolId, {
      important: true,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to toggle important protocol: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
