"use server";

import User from "@/database/module/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag, { ITag } from "@/database/module/tag.model";
import Question from "@/database/module/question.model";
import { FilterQuery } from "mongoose";

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
    const { searchQuery } = params;
    const query: FilterQuery<typeof Tag> = {}
    if (searchQuery) {
      query.$or = [
        {
          name: new RegExp(searchQuery, "i")
        }
      ]
    }
    const tags = await Tag.find(query);
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();
    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clrekId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error)
  }
}


/**
 * @description 获取热门标签
 */

export async function getHotTags() {
  try {
    await connectToDatabase();
    const hotTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ])
    return hotTags
  } catch (error) {

  }
}
