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

    router.push('/dashboard/cities')
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
          <Link href="/dashboard/protocols" className="w-full">
            <Button className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-700 text-slate-200 transition-all">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="w-full bg-slate-200 hover:bg-slate-300 text-black transition-all"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
