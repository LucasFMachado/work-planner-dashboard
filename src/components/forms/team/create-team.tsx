'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/useToast'
import { createTeam } from '@/lib/actions/team.actions'
import { Routes } from '@/lib/constants'
import { CreateTeamValidation } from '@/lib/validations/team.validations'

export function CreateTeam() {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()

  const form = useForm({
    resolver: zodResolver(CreateTeamValidation),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof CreateTeamValidation>) => {
    try {
      await createTeam({
        name: values.name,
        path: pathname,
      })
      showToast({ type: 'success', message: 'Team updated' })
      router.push(`/dashboard/${Routes.teams}`)
    } catch {
      showToast({ type: 'error', message: 'An error occurred' })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-component">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Requestor</FormLabel>
              <FormControl>
                <Input type="text" className="input-text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row w-full gap-2">
          <Link href={`/dashboard/${Routes.teams}`} className="w-full">
            <Button className="form-cancel-button">Cancel</Button>
          </Link>
          <Button type="submit" className="form-create-button">
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
