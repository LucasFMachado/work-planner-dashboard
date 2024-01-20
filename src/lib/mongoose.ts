import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) {
    return console.log('MONGODB_URL not found.')
  }

  if (isConnected) {
    return console.log('Already connected to MongoDB.')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true
    console.log('Successfuly connected to MongoDB.')
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error to connect on MongoDB: ${error.message}`)
    }
    console.log(`Internal server error: ${error}`)
  }
}
