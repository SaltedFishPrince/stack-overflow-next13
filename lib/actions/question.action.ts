"use server"

import Question from "@/database/module/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/module/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/module/user.model";
import { revalidatePath } from "next/cache";


export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase()
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 });
    return { questions }
  } catch (error) {
    console.log('getQuestions error', error)
    throw error
  }
}



export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase()
    const { title, content, tags, author, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // 查询条件，使用正则表达式进行模糊匹配
        { $setOnInsert: { name: tag }, $push: { questions: question._id } }, // 更新操作，如果找不到匹配的文档，则插入新文档
        { upsert: true, new: true } // 选项，upsert 表示如果找不到匹配的文档则插入新文档，new 表示返回更新后的文档
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }, // $each 将多个值一次性添加
    });

    revalidatePath(path)
  } catch (error) {
    console.log('queston action', error)
  }
}
