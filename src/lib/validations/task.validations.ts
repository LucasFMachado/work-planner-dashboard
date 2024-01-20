import * as z from 'zod'

export const CreateTaskValidation = z.object({
  name: z.string().min(1),
  description: z.string().max(500, 'Maximum 500 characters.'),
  important: z.boolean().default(false),
})

export const UpdateTaskValidation = z.object({
  name: z.string().min(1),
  description: z.string().max(500, 'Maximum 500 characters.'),
  important: z.boolean().default(false),
})
