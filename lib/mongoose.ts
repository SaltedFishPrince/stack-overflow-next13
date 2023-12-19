import mongoose from 'mongoose';
let isConnect: boolean = false
export const connectToDatabase = async () => {
  // 开启严格查询
  mongoose.set('strictQuery', true)
  if (isConnect) {
    return console.log('database connected')
  }

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined')
    }
    await mongoose.connect(process.env.MONGODB_URL)
    isConnect = true
    console.log('database connected success')
  } catch (error) {
    console.log('error', error)
  }
}

