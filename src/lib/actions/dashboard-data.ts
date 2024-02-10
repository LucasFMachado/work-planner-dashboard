'use server'

import { groupBy, sortBy } from 'lodash'

import City from '../models/city.model'
import Protocol from '../models/protocol.model'
import { connectToDB } from '../mongoose'
import { FetchDashboardDataReturn } from '../types/dashboard-data'

export async function fetchDashboardData(): Promise<FetchDashboardDataReturn> {
  try {
    connectToDB()

    const openedProtocols = await Protocol.find({ deleted: false })
      .select('number')
      .populate({
        path: 'city',
        model: City,
        select: 'name',
      })

    const cityProtocols = Object.values(groupBy(openedProtocols, 'city._id'))

    const cityProtocolsFormatted = cityProtocols.map(cityProtocols => ({
      protocolsCount: cityProtocols.length || 0,
      city: cityProtocols[0]?.city.name,
    }))

    return {
      totalProtocols: openedProtocols?.length || 0,
      cityProtocols: sortBy(cityProtocolsFormatted, 'city'),
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch dashboard data: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
