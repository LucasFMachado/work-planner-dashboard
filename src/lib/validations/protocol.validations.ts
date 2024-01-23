import * as z from 'zod'

export const CreateProtocolValidation = z.object({
  requestor: z.string().min(1, 'Required field'),
  description: z.string().max(500, 'Maximum 500 characters.'),
  address: z.string().min(1, 'Required field'),
  cityId: z.string().min(1, 'Required field'),
})

export const UpdateProtocolValidation = z.object({
  requestor: z.string().min(1, 'Required field'),
  description: z.string().max(500, 'Maximum 500 characters.'),
  address: z.string().min(1, 'Required field'),
  cityId: z.string().min(1, 'Required field'),
  completed: z.boolean().default(false),
})
