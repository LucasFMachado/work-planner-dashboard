export type TaskDto = {
  _id: string
  name: string
  description?: string
  completed: boolean
  important: boolean
  deadline?: Date
  createdAt: Date
  completedAt?: Date
}
