import { ChangeEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useUploadThing } from '@/utils/uploadthing'

export function useFileHandler() {
  const { startUpload } = useUploadThing('media')
  const [file, setFile] = useState<File | undefined>(undefined)

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault()

    const fileReader = new FileReader()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFile(e.target.files[0])

      if (!file.type.includes('image')) {
        return
      }

      fileReader.onload = event => {
        const imageDataUrl = event?.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  async function uploadFile(file: File) {
    const extension = file.name.split('.').pop()
    const fileResponse = await startUpload([
      new File([file], `${uuid()}.${extension}`),
    ])

    if (fileResponse && fileResponse[0]?.url) {
      return fileResponse[0].url
    }

    return ''
  }

  return { handleFile, uploadFile, file }
}
