import * as z from 'zod'

export const CreateEmployeeValidation = z.object({
  name: z.string().min(1, 'Required field'),
  role: z.string().min(1, 'Required field'),
})

export const UpdateEmployeeValidation = z.object({
  name: z.string().min(1, 'Required field'),
  role: z.string().min(1, 'Required field'),
})
