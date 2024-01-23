export type TaskEntity = {
  _id: string
  name: string
  description?: string
  completed: boolean
  important: boolean
  deadline?: Date
  createdAt: Date
  completedAt?: Date
}

export type FetchTasksReturn = {
  tasks: TaskEntity[]
  hasNextPage: boolean
}

export type CreateTaskParams = {
  name: string
  description: string
  important: boolean
  deadline?: Date | null
  path: string
}

export type UpdateTaskParams = {
  taskId: string
  name: string
  description: string
  important: boolean
  path: string
}

export type ChangeTaskStatus = {
  taskId: string
  path: string
}
