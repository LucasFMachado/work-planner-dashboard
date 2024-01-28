import * as z from 'zod'

export const CreateProductUnitValidation = z.object({
  unit: z.string().min(1, 'Required field'),
  name: z.string().min(1, 'Required field'),
})
