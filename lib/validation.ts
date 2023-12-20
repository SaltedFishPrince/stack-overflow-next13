import * as z from 'zod';


// 提交问题验证
export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(10),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3)
});
export type QuestionsSchemaType = typeof QuestionsSchema;

// 提交答案验证
export const AnswerSchema = z.object({
  answer: z.string().min(10),
});
export type AnswerSchemaType = typeof AnswerSchema;

// 修改用户信息验证
export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  bio: z.string().min(10).max(500),
  username: z.string().min(5).max(15),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
});
export type ProfileSchemaType = typeof ProfileSchema;
