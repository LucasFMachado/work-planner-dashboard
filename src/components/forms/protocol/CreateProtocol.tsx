'use client'

import 'react-quill/dist/quill.snow.css'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { createProtocol } from '@/lib/actions/protocol.actions'
import { CitiesListOption } from '@/lib/types/city.types'
import { CreateProtocolValidation } from '@/lib/validations/protocol.validations'

interface CreateProtocolProps {
  cities: CitiesListOption[]
}

export function CreateProtocol({ cities }: CreateProtocolProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()

  const form = useForm({
    resolver: zodResolver(CreateProtocolValidation),
    defaultValues: {
      requestor: '',
      description: '',
      address: '',
      cityId: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof CreateProtocolValidation>) => {
    await createProtocol({
      requestor: values.requestor,
      description: values.description,
      address: values.address,
      cityId: values.cityId,
      path: pathname,
    })
    showToast({ type: 'success', message: 'Protocol created' })
    router.push('/dashboard/protocols')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-component">
        <FormField
          control={form.control}
          name="requestor"
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

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Address</FormLabel>
              <FormControl>
                <Input type="text" className="input-text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cityId"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="input-select">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="input-select-list">
                  {cities?.map(city => (
                    <SelectItem
                      key={city.value}
                      value={city.value}
                      className="input-select-list-item"
                    >
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="input-label">Description</FormLabel>
              <FormControl>
                <ReactQuill
                  className="input-text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Test"
                  theme="snow"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row w-full gap-2">
          <Link href="/dashboard/protocols" className="w-full">
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
