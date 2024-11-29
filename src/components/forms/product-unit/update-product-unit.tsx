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
import { useToast } from '@/hooks/useToast'
import { updateProductUnit } from '@/lib/actions/product-unit.actions'
import { Routes } from '@/lib/constants'
import { ProductUnitEntity } from '@/lib/types/product-unit.types'
import { UpdateProductUnitValidation } from '@/lib/validations/product-unit.validations'

interface UpdateProductUnitProps {
  productUnit: ProductUnitEntity
}

export function UpdateProductUnit({ productUnit }: UpdateProductUnitProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()

  const form = useForm({
    resolver: zodResolver(UpdateProductUnitValidation),
    defaultValues: {
      name: productUnit.name,
      unit: productUnit.unit,
    },
  })

  const onSubmit = async (
    values: z.infer<typeof UpdateProductUnitValidation>,
  ) => {
    await updateProductUnit({
      productUnitId: productUnit._id,
      name: values.name,
      unit: values.unit,
      path: pathname,
    })
    showToast({ type: 'success', message: 'Product unit updated' })
    router.push(`/dashboard/${Routes.protuctUnits}`)
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
          name="unit"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Unit</FormLabel>
              <FormControl>
                <Input type="text" className="input-text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row w-full gap-2">
          <Link href={`/dashboard/${Routes.protuctUnits}`} className="w-full">
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
