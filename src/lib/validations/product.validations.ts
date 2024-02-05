import * as z from 'zod'

export const CreateProductValidation = z.object({
  name: z.string().min(1, 'Required field'),
  productUnitId: z.string().min(1, 'Required field'),
})

export const UpdateProductValidation = z.object({
  name: z.string().min(1, 'Required field'),
  productUnitId: z.string().min(1, 'Required field'),
})
