"use server";

import User from "@/database/module/user.model";
import { connectToDatabase } from "../mongoose";
import { IUser } from '@/database/module/user.model'
interface Props {
  userId: string | number
}
export async function getUserById({ userId }: Props): Promise<IUser> {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId }).exec();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
