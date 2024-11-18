'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
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
import { useFileHandler } from '@/hooks/useFileHandler'
import { useToast } from '@/hooks/useToast'
import { createProduct } from '@/lib/actions/product.actions'
import { Routes } from '@/lib/constants'
import { ProductUnitsListOption } from '@/lib/types/product-unit.types'
import { CreateProductValidation } from '@/lib/validations/product.validations'

interface CreateProductProps {
  productUnits: ProductUnitsListOption[]
}

export function CreateProduct({ productUnits }: CreateProductProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()
  const { handleFile, uploadFile, file } = useFileHandler()

  const form = useForm({
    resolver: zodResolver(CreateProductValidation),
    defaultValues: {
      name: '',
      image: '',
      productUnitId: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof CreateProductValidation>) => {
    if (file) {
      const uploadedFile = await uploadFile(file)
      values.image = uploadedFile
    } else {
      values.image = ''
    }

    await createProduct({
      name: values.name,
      productUnitId: values.productUnitId,
      image: values.image,
      path: pathname,
    })
    showToast({ type: 'success', message: 'Product created' })
    router.push(`/dashboard/${Routes.products}`)
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
          name="productUnitId"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Product Unit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="input-select">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="input-select-list">
                  {productUnits?.map(productUnit => (
                    <SelectItem
                      key={productUnit.value}
                      value={productUnit.value}
                      className="input-select-list-item"
                    >
                      {productUnit.label}
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
          name="image"
          render={({ field }) => (
            <FormItem className="input-item">
              <FormLabel className="input-label">Image</FormLabel>
              <div className="flex flex-col gap-2">
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a product image"
                    className="input-file"
                    onChange={e => handleFile(e, field.onChange)}
                  />
                </FormControl>
                {field.value && (
                  <Image
                    src={field.value}
                    alt="Product image"
                    width={96}
                    height={96}
                    priority
                    className="rounded-md object-contain w-full"
                  />
                )}
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row w-full gap-2">
          <Link href={`/dashboard/${Routes.products}`} className="w-full">
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
