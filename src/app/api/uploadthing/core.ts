import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

// const getUser = async () => await currentUser()

export const ourFileRouter = {
  media: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      //   const user = await getUser()

      //   if (!user) {
      //     throw new Error('Unauthorized')
      //   }

      //   return { userId: user.id }
      return { userId: 'user_id_test' }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
