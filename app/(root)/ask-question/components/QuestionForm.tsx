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
import Image from 'next/image';
import type React from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import Tiptap from '../../../../components/tiptap';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
const QuestionForm = () => {
  const form = useForm<z.infer<QuestionsSchemaType>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: '',
      tags: []
    }
  });
  const onSubmit = (values: z.infer<QuestionsSchemaType>) => {
    console.log(values);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<QuestionsSchemaType>, 'tags'>
  ) => {
    if (e.key !== 'Enter' || field.name !== 'tags') return;
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
      form.trigger();
    }
  };

  const handleTagRemove = (tag:string, field: ControllerRenderProps<z.infer<QuestionsSchemaType>, 'tags'>) => {
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
          render={() => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{' '}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Tiptap/>
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
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {
                    field.value && field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag) => (
                          <Badge
                            key={tag}
                            className="medium-big background-light800_dark300 text-light400_light500
                            flex items-center justify-center gap-2 rounded-md border-none px-4 py-2
                             capitalize"
                          >
                            {tag}
                            <Image
                              src="/assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                              onClick={() => handleTagRemove(tag, field)}
                            />
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
        >
          edit
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
