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
import { Switch } from '@/components/ui/switch'
import { updateProtocol } from '@/lib/actions/protocol.actions'
import { ProtocolDto } from '@/lib/types/protocol.types'
import { formatProotcol } from '@/lib/utils'
import { UpdateProtocolValidation } from '@/lib/validations/protocol.validations'

interface UpdateProtocolProps {
  protocol: ProtocolDto
}

export function UpdateProtocol({ protocol }: UpdateProtocolProps) {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(UpdateProtocolValidation),
    defaultValues: {
      number: formatProotcol(protocol.number),
      requestor: protocol.requestor,
      description: protocol.description || '',
      address: protocol.address,
      cityId: protocol.cityId,
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

    router.push('/dashboard/protocols')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-component">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Protocol number</FormLabel>
              <FormControl>
                <Input type="text" disabled className="input-text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel className="input-label">City ID</FormLabel>
              <FormControl>
                <Input type="number" className="input-text" {...field} />
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

        <FormField
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
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}
