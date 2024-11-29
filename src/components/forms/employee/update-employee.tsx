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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { updateEmployee } from '@/lib/actions/employee.actions'
import { Routes } from '@/lib/constants'
import { EmployeeEntity, RolesListOption } from '@/lib/types/employee.types'
import { UpdateEmployeeValidation } from '@/lib/validations/employee.validations'

interface UpdateEmployeeProps {
  employee: EmployeeEntity
  roles: RolesListOption[]
}

export function UpdateEmployee({ employee, roles }: UpdateEmployeeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()

  const form = useForm({
    resolver: zodResolver(UpdateEmployeeValidation),
    defaultValues: {
      name: employee.name,
      role: employee.role,
    },
  })

  const onSubmit = async (values: z.infer<typeof UpdateEmployeeValidation>) => {
    await updateEmployee({
      employeeId: employee._id,
      name: values.name,
      role: values.role,
      path: pathname,
    })
    showToast({ type: 'success', message: 'Employee updated' })
    router.push(`/dashboard/${Routes.employees}`)
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="input-select">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="input-select-list">
                  {roles?.map(role => (
                    <SelectItem
                      key={role.value}
                      value={role.value}
                      className="input-select-list-item"
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row w-full gap-2">
          <Link href={`/dashboard/${Routes.employees}`} className="w-full">
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
