"use server"

import Question from "@/database/module/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/module/tag.model";
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from "./shared.types";
import User from "@/database/module/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/module/answer.model";
import Interaction from "@/database/module/interaction.model";


/**
 * @description 获取问题
 * @param params 
 * @returns 
 */
export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase()
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

/**
 * @description 创建问题
 * @param params 
 */
export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase()
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

/**
 * @description 通过Id查询问题
 * @param params 
 * @returns 
 */
export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description 赞成问题
 * @param params 
 */
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation bt +10 for upvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description 否定问题
 * @param params 
 */
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation bt +10 for upvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}


/**
 * @description 删除问题
 */
export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path)
  } catch (error) {

  }
}

/**
 * @description 修改问题
 */
export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase()
    const { questionId, title, content, path } = params
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {

  }
}

/**
 * @description 获取热门问题
 */
export async function getHotQuestions() {
  try {
    await connectToDatabase()
    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return hotQuestions
  } catch (error) {
    console.log("🚀 ~ file: question.action.ts:233 ~ getHotQuestions ~ error:", error)
  }
}
