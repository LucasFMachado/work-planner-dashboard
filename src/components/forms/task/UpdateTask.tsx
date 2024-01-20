'use client'

import 'react-quill/dist/quill.snow.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import * as z from 'zod'

import { updateTask } from '@/lib/actions/task.actions'
import { TaskDto } from '@/lib/types/task.types'
import { UpdateTaskValidation } from '@/lib/validations/task.validations'

import { Button } from '../../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'
import { Switch } from '../../ui/switch'

interface UpdateTaskProps {
  task: TaskDto
}

export function UpdateTask({ task }: UpdateTaskProps) {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(UpdateTaskValidation),
    defaultValues: {
      name: task.name,
      description: task.description || '',
      important: task.important,
    },
  })

  const onSubmit = async (values: z.infer<typeof UpdateTaskValidation>) => {
    await updateTask({
      taskId: task._id,
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

        <Button type="submit" className="bg-emerald-500 text-black">
          Update task
        </Button>
      </form>
    </Form>
  )
}
