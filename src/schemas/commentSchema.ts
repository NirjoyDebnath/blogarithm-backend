import joi from 'joi';
import { ICommentStoryInput } from '../interfaces/comment';

export const commentStorySchema: joi.ObjectSchema<ICommentStoryInput> =
  joi.object<ICommentStoryInput>({
    Comment: joi.string().required().messages({
      'string.base': 'Comment must be a string',
      'any.required': 'Title is required'
    })
  });
