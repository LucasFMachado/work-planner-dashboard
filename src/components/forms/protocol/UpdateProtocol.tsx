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
// import { Switch } from '@/components/ui/switch'
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
      completed: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof UpdateProtocolValidation>) => {
    await updateProtocol({
      protocolId: protocol._id,
      requestor: values.requestor,
      description: values.description,
      address: values.address,
      cityId: values.cityId,
      completed: values.completed,
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
                  <SelectContent className="input-select-content">
                    {cities?.map(city => (
                      <SelectItem
                        key={city.value}
                        value={city.value}
                        className="input-select-item"
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

        {/* <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Completed</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                  className="input-switch"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="flex flex-col-reverse sm:flex-row w-full gap-2">
          <Link href="/dashboard/protocols" className="w-full">
            <Button className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-700 text-slate-200 transition-all">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-950 transition-all"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}
