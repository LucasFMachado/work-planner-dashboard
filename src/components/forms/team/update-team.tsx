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
import { updateTeam } from '@/lib/actions/team.actions'
import { Routes } from '@/lib/constants'
import { TeamEntity } from '@/lib/types/team.types'
import { UpdateTeamValidation } from '@/lib/validations/team.validations'

interface UpdateTeamProps {
  team: TeamEntity
}

export function UpdateTeam({ team }: UpdateTeamProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()

  const form = useForm({
    resolver: zodResolver(UpdateTeamValidation),
    defaultValues: {
      name: team.name,
    },
  })

  const onSubmit = async (values: z.infer<typeof UpdateTeamValidation>) => {
    await updateTeam({
      teamId: team._id,
      name: values.name,
      path: pathname,
    })
    showToast({ type: 'success', message: 'Team updated' })
    router.push(`/dashboard/${Routes.teams}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-component">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Name</FormLabel>
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
          <Button type="submit" className="form-update-button">
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}
