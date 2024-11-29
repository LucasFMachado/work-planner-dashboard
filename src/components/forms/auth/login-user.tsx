'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import { LoginValidation } from '@/lib/validations/auth.validations'

export function LoginUser() {
  const router = useRouter()
  const { showToast } = useToast()

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    // Dumb validation
    if (values.login !== 'test' && values.password !== 'test') {
      showToast({ type: 'error', message: 'Login and/or password wrong!' })
      return
    }
    showToast({ type: 'success', message: 'Welcome :)' })
    router.push('/dashboard')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-neutral-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-4 w-1/3 min-w-[400px] rounded-md p-8 border shadow-md bg-neutral-50"
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className="input-item">
                <FormLabel className="input-label">Login</FormLabel>
                <FormControl>
                  <Input type="text" className="input-text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="input-item">
                <FormLabel className="input-label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="input-text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="form-create-button">
            Enter
          </Button>
        </form>
      </Form>
    </div>
  )
}
