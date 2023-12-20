import Question from "@/database/module/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/module/interaction.model";
import { revalidatePath } from "next/cache";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { userId, questionId, path } = params
    await Question.findByIdAndUpdate(questionId,
      {
        $inc: { views: 1 }
      },
    )
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      })
      if (existingInteraction) return
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
    path && revalidatePath(path)
  } catch (error) {

  }
}
