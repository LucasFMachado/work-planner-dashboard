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
import { createTask } from '@/lib/actions/task.actions'
import { CreateTaskValidation } from '@/lib/validations/task.validations'

export function CreateTask() {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(CreateTaskValidation),
    defaultValues: {
      name: '',
      description: '',
      important: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof CreateTaskValidation>) => {
    await createTask({
      name: values.name,
      description: values.description,
      important: values.important,
      path: pathname,
    })

    router.push('/dashboard/tasks')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-component">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Title</FormLabel>
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

        <FormField
          control={form.control}
          name="important"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Important</FormLabel>
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
          <Link href="/dashboard/tasks" className="w-full">
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
