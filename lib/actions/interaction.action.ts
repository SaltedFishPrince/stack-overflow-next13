import Question from "@/database/module/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { userId, questionId } = params
    await Question.findByIdAndUpdate(questionId,
      {
        $inc: { views: 1 }
      },
      {
        new: true
      }
    )
  } catch (error) {

  }
}
