'use server'

import { revalidatePath } from 'next/cache'

import Protocol from '@/lib/models/protocol.model'
import { ProtocolDto } from '@/lib/types/protocol.types'

import City from '../models/city.model'
import { connectToDB } from '../mongoose'

interface FetchProtocolsReturn {
  protocols: ProtocolDto[]
  hasNextPage: boolean
}

export async function fetchProtocols(
  pageNumber = 1,
  pageSize = 15,
): Promise<FetchProtocolsReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const protocolsQuery = Protocol.find({ deleted: false })
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)

    const totalProtocols = await Protocol.countDocuments()

    const protocols = await protocolsQuery.exec()
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

export async function fetchProtocol(protocolId: string): Promise<ProtocolDto> {
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

interface ICreateProtocolParams {
  requestor: string
  address: string
  cityId: string
  description?: string
  path: string
}

export async function createProtocol({
  requestor,
  address,
  cityId,
  description,
  path,
}: ICreateProtocolParams) {
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
      cityId,
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

interface IUpdateProtocolParams {
  protocolId: string
  requestor: string
  address: string
  cityId: string
  description: string
  completed: boolean
  path: string
}

export async function updateProtocol({
  protocolId,
  requestor,
  address,
  cityId,
  description,
  completed = false,
  path,
}: IUpdateProtocolParams) {
  try {
    connectToDB()

    await Protocol.findByIdAndUpdate(protocolId, {
      requestor,
      address,
      cityId,
      description,
      completed,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to create thread: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

interface IChangeProtocolStatus {
  protocolId: string
  path: string
}

export async function completeProtocol({
  protocolId,
  path,
}: IChangeProtocolStatus): Promise<void> {
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
}: IChangeProtocolStatus): Promise<void> {
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
      throw new Error(`Failed to complete protocol: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function toggleImportantProtocol({
  protocolId,
  path,
}: IChangeProtocolStatus): Promise<void> {
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
