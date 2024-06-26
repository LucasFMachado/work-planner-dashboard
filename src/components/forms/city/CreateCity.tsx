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
import { createCity } from '@/lib/actions/city.actions'
import { Routes } from '@/lib/constants'
import { CreateCityValidation } from '@/lib/validations/city.validations'

export function CreateCity() {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(CreateCityValidation),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof CreateCityValidation>) => {
    await createCity({
      name: values.name,
      path: pathname,
    })

    router.push(`/dashboard/${Routes.cities}`)
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
          <Link href={`/dashboard/${Routes.cities}`} className="w-full">
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
