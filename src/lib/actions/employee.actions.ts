'use server'

import { revalidatePath } from 'next/cache'

import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '../constants'
import Employee from '../models/employee.model'
import { connectToDB } from '../mongoose'
import {
  CreateEmployeeParams,
  DeleteEmployeeParams,
  EmployeeEntity,
  FetchEmployeesReturn,
  FetchRolesListReturn,
  UpdateEmployeeParams,
} from '../types/employee.types'

export async function fetchEmployees(
  pageNumber = INITIAL_PAGE,
  pageSize = INITIAL_PAGE_SIZE,
): Promise<FetchEmployeesReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const employees: EmployeeEntity[] = await Employee.find({
      deleted: false,
    })
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)

    const totalEmployees = await Employee.countDocuments({
      deleted: false,
    })
    const hasNextPage = totalEmployees > skipAmount + employees.length

    return {
      employees,
      hasNextPage,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch employee: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchEmployee(
  employeeId: string,
): Promise<EmployeeEntity> {
  try {
    connectToDB()

    const employee = await Employee.findById(employeeId)

    return employee
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch employee: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function createEmployee({
  name,
  role,
  path,
}: CreateEmployeeParams) {
  try {
    connectToDB()

    await Employee.create({
      name,
      role,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to create employee: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function updateEmployee({
  employeeId,
  name,
  role,
  path,
}: UpdateEmployeeParams) {
  try {
    connectToDB()

    await Employee.findByIdAndUpdate(employeeId, {
      name,
      role,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to update employee: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function deleteEmployee({
  employeeId,
  path,
}: DeleteEmployeeParams): Promise<void> {
  try {
    connectToDB()

    await Employee.findByIdAndUpdate(employeeId, {
      deleted: true,
      deletedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete employee: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchRolesList(): Promise<FetchRolesListReturn> {
  try {
    const roles = [
      {
        label: 'Manager',
        value: 'M',
      },
      {
        label: 'Administrative',
        value: 'A',
      },
      {
        label: 'Operational',
        value: 'O',
      },
    ]

    return { roles }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch roles: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
