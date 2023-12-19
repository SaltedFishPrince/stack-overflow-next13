"use server";

import User from "@/database/module/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/module/tag.model";

/**
 * @description
 * @param params 
 * @returns 
 */
export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // Interaction ...

    return [
      { _id: "1", name: "Next" },
      { _id: "2", name: "Prism" },
      { _id: "3", name: "Docker" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description 获取全部标签
 * @param params 
 * @returns 
 */
export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
