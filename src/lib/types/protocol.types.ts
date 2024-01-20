export type ProtocolDto = {
  _id: string
  number: number
  requestor: string
  description?: string
  address: string
  cityId: string
  createdAt: Date
  completed: boolean
  completedAt?: Date
}
