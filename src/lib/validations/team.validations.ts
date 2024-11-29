import * as z from 'zod'

export const CreateTeamValidation = z.object({
  name: z.string().min(1, 'Required field'),
})

export const UpdateTeamValidation = z.object({
  name: z.string().min(1, 'Required field'),
})
