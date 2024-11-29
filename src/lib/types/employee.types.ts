export type EmployeeEntity = {
  _id: string
  name: string
  role: string
  active: boolean
  createdAt: Date
  deleted: boolean
  deletedAt?: Date
}

export type FetchEmployeesReturn = {
  employees: EmployeeEntity[]
  hasNextPage: boolean
}

export type CreateEmployeeParams = {
  name: string
  role: string
  path: string
}

export type UpdateEmployeeParams = {
  employeeId: string
  name: string
  role: string
  path: string
}

export type DeleteEmployeeParams = {
  employeeId: string
  path: string
}

export type RolesListOption = {
  label: string
  value: string
}

export type FetchRolesListReturn = {
  roles: RolesListOption[]
}
