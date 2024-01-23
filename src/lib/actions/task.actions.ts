'use server'

import { revalidatePath } from 'next/cache'

import Task from '@/lib/models/task.model'
import {
  ChangeTaskStatus,
  CreateTaskParams,
  FetchTasksReturn,
  TaskEntity,
  UpdateTaskParams,
} from '@/lib/types/task.types'

import { connectToDB } from '../mongoose'

export async function fetchTasks(
  pageNumber = 1,
  pageSize = 15,
): Promise<FetchTasksReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const tasksQuery = Task.find()
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)

    const totalTasks = await Task.countDocuments()

    const tasks = await tasksQuery.exec()
    const hasNextPage = totalTasks > skipAmount + tasks.length

    return {
      tasks,
      hasNextPage,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch tasks: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchTask(taskId: string): Promise<TaskEntity> {
  try {
    connectToDB()

    const task = await Task.findById(taskId)

    return task
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch task: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function createTask({
  name,
  description,
  important = false,
  deadline = null,
  path,
}: CreateTaskParams) {
  try {
    connectToDB()

    await Task.create({
      name,
      description,
      important,
      deadline,
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

export async function updateTask({
  taskId,
  name,
  description,
  important = false,
  path,
}: UpdateTaskParams) {
  try {
    connectToDB()

    await Task.findByIdAndUpdate(taskId, {
      name,
      description,
      important,
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

export async function completeTask({
  taskId,
  path,
}: ChangeTaskStatus): Promise<void> {
  try {
    connectToDB()

    await Task.findByIdAndUpdate(taskId, {
      completed: true,
      completedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to complete task: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function toggleImportantTask({
  taskId,
  path,
}: ChangeTaskStatus): Promise<void> {
  try {
    connectToDB()

    await Task.findByIdAndUpdate(taskId, {
      important: true,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to toggle important task: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
