import mongoose from 'mongoose';
let isConnect: boolean = false
export const connectToDatabase = async () => {
  // 开启严格查询
  mongoose.set('strictQuery', true)
  if (isConnect) {
    return console.log('database connected')
  }

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/devflow')
    isConnect = true
    console.log('database connected success')
  } catch (error) {
    console.log('error', error)
  }
}

