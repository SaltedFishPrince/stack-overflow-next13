import mongoose from 'mongoose';
let isConnect: boolean = false
export const connectToDatabase = async () => {
  // 开启严格查询
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnect) {
    return console.log('database connected')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "dev_flow",
    });
    isConnect = true
    console.log('database connected success')
  } catch (error) {
    console.log('error', error)
  }
}

