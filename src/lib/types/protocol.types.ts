import { CityEntity } from './city.types'

export type ProtocolDto = {
  _id: string
  number: number
  requestor: string
  description?: string
  address: string
  city: CityEntity
  createdAt: Date
  completed: boolean
  completedAt?: Date
  deleted: boolean
  deletedAt?: Date
}

export type FetchProtocolsReturn = {
  protocols: ProtocolDto[]
  hasNextPage: boolean
}

export type CreateProtocolParams = {
  requestor: string
  address: string
  cityId: string
  description?: string
  path: string
}

export type UpdateProtocolParams = {
  protocolId: string
  requestor: string
  address: string
  cityId: string
  description: string
  completed: boolean
  path: string
}

export type ChangeProtocolStatus = {
  protocolId: string
  path: string
}
