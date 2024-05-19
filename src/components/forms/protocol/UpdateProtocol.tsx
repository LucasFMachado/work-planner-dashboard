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
import { updateProtocol } from '@/lib/actions/protocol.actions'
import { CitiesListOption } from '@/lib/types/city.types'
import { ProtocolEntity } from '@/lib/types/protocol.types'
import { formatProotcol } from '@/lib/utils'
import { UpdateProtocolValidation } from '@/lib/validations/protocol.validations'

interface UpdateProtocolProps {
  protocol: ProtocolEntity
  cities: CitiesListOption[]
}

export function UpdateProtocol({ protocol, cities }: UpdateProtocolProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()

  const form = useForm({
    resolver: zodResolver(UpdateProtocolValidation),
    defaultValues: {
      number: formatProotcol(protocol.number),
      requestor: protocol.requestor,
      description: protocol.description || '',
      address: protocol.address,
      cityId: String(protocol.city),
    },
  })

  const onSubmit = async (values: z.infer<typeof UpdateProtocolValidation>) => {
    await updateProtocol({
      protocolId: protocol._id,
      requestor: values.requestor,
      description: values.description,
      address: values.address,
      cityId: values.cityId,
      path: pathname,
    })
    showToast({ type: 'success', message: 'Protocol updated' })
    router.push('/dashboard/protocols')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-component">
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="input-item">
                <FormLabel className="input-label">Protocol</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled
                    className="input-text"
                    {...field}
                  />
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
                <Select
                  disabled
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </div>

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
          <Button type="submit" className="form-update-button">
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}
