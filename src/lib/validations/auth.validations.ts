import * as z from 'zod'

export const LoginValidation = z.object({
  login: z.string().min(1, 'Required field'),
  password: z.string().min(1, 'Required field'),
})
