"use server";

import User from "@/database/module/user.model";
import { connectToDatabase } from "../mongoose";
import { IUser } from '@/database/module/user.model'
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/module/question.model";
import Tag from "@/database/module/tag.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/module/answer.model";

/**
 * @description 根据Id查询用户
 * @param param0 
 * @returns 
 */
export async function getUserById({ userId }: { userId: string }): Promise<IUser> {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId }).exec();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description 创建用户
 * @param userData 
 * @returns 
 */
export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description 更新用户信息
 * @param params 
 */
export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description 删除用户
 * @param params 
 * @returns 
 */
export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from databse
    // and questions, answers, comments, etc

    // get user question ids
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


/**
 * @description 获取所有用户
 * @param params 
 * @returns 
 */
export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase();

    const { page = 1, pageSize = 20, filter, searchQuery } = params;
    let query: FilterQuery<typeof User> = {}
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ]
    }
    const users = await User.find(query).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description 收藏/取消收藏 问题
 */
export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();
    const { userId, questionId, path } = params
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      // 在保存列表中删除
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // 在保存列表中增加
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {

  }
}

/**
 * @description 获取用户收藏的问题
 */
export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const users = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clrekId name picture" },
      ],
    });
    if (!users) {
      throw new Error("User not found");
    }
    return { saved: users.saved }
  } catch (error) {

  }

}

/**
 * @description 获取用户所有回答
 * @param params 
 * @returns 
 */
export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    const isNextAnswer = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, answers: userAnswers, isNextAnswer };
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:222 ~ getUserAnswers ~ error:", error)

  }
}


/**
 * @description 获取用户所有问题
 */
export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    const isNextQuestions = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNextQuestions };
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:252 ~ getUserQuestions ~ error:", error)
  }
}

/**
 * @description 获取用户信息
 */
export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase()
    const { userId } = params
    const user = await User.findOne({ clerkId: userId }).exec()
    if (!user) {
      throw new Error("User not found");
    }
    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswers = await Answer.countDocuments({ author: user._id })
    return { user, totalQuestions, totalAnswers }
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:268 ~ getUserInfo ~ error:", error)
  }
}
