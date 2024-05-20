import mongoose from 'mongoose'
import { envConfig } from './env'

const connectDatabase = async () => {
  try {
    await mongoose.connect(envConfig.get('MONGO_URI') as string)
    console.log('☘️ MongoDB successfully connected!')
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('An unknown error occurred')
    }
    process.exit(1)
  }
}

export default connectDatabase
