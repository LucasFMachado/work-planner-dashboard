import * as z from 'zod'

export const CreateCityValidation = z.object({
  name: z.string().min(1, 'Required field'),
})

export const UpdateCityValidation = z.object({
  name: z.string().min(1, 'Required field'),
})
