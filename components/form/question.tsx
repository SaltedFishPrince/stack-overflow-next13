'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { QuestionsSchemaType } from '@/lib/validation';
import { QuestionsSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import Tiptap from '@/components/tiptap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createQuestion, editQuestion } from '@/lib/actions/question.action';
import { useRouter, usePathname } from 'next/navigation'
interface QuestionFormProps {
  type?: "Edit" | "Add";
  userId: string
  questionDetails?: string;
}
const QuestionForm = ({ userId, questionDetails, type = 'Add' }: QuestionFormProps) => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname()


  const parsedQuestionDetails =
    questionDetails && JSON.parse(questionDetails || "");

  const groupedTags = parsedQuestionDetails?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<QuestionsSchemaType>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || "",
      explanation: parsedQuestionDetails?.content || "",
      tags: groupedTags || [],
    }
  });

  const onSubmit = async (values: z.infer<QuestionsSchemaType>) => {
    setIsSubmit(true);
    try {
      if (type === "Edit") {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });

        router.push(`/question/${parsedQuestionDetails._id}`);
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(userId),
          path: pathname,
        });

        router.push("/");
      }
    } catch {

    } finally {
      setIsSubmit(false);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<QuestionsSchemaType>, 'tags'>
  ) => {

    if (e.key !== 'Enter' || field.name !== 'tags') return;
    e.preventDefault()
    const tagInput = e.target as HTMLInputElement;
    const tagValue = tagInput.value.trim();
    if (tagValue === '') return;
    if (tagValue.length > 15) {
      return form.setError('tags', {
        type: 'maxLength',
        message: 'Tags can only be 15 characters long'
      });
    }
    if (field.value.length > 2) {
      return form.setError('tags', {
        type: 'maxLength',
        message: 'You can only have 3 tags'
      });
    }
    if (!field.value.includes(tagValue)) {
      form.setValue('tags', [...field.value, tagValue]);
      tagInput.value = '';
      form.clearErrors('tags');
    } else {
      return form.setError('tags', {
        type: "repeat",
        message: `The ${tagValue} tag has been added`
      });
    }
  };

  const handleTagRemove = (tag: string, field: ControllerRenderProps<z.infer<QuestionsSchemaType>, 'tags'>) => {
    const newTagValue = field.value.filter(t => t !== tag);
    form.setValue('tags', newTagValue);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{' '}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Tiptap
                  content={parsedQuestionDetails?.content || ''}
                  onBlur={() => field.onBlur()}
                  onUpdate={({ editor }) => {
                    field.onChange(editor.getHTML())
                  }} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    disabled={type === 'Edit'}
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {
                    field.value && field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag) => (
                          <Badge
                            key={tag}
                            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                            onClick={() =>
                              type !== "Edit"
                                ? handleTagRemove(tag, field)
                                : () => { }
                            }
                          >
                            {tag}
                            {type !== "Edit" && (
                              <Image
                                src="/assets/icons/close.svg"
                                alt="Close icon"
                                width={12}
                                height={12}
                                className="cursor-pointer object-contain invert-0 dark:invert"
                              />
                            )}
                          </Badge>
                        ))}
                      </div>
                    )
                  }
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmit}
        >
          {isSubmit ? (
            <>{type === "Edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "Edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
