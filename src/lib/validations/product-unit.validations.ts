import * as z from 'zod'

export const CreateProductUnitValidation = z.object({
  name: z.string().min(1, 'Required field'),
  unit: z.string().min(1, 'Required field'),
})

export const UpdateProductUnitValidation = z.object({
  name: z.string().min(1, 'Required field'),
  unit: z.string().min(1, 'Required field'),
})
