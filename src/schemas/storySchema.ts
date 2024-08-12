import joi from 'joi';
import { ICreateStoryInput, IUpdateStoryInput } from '../interfaces/story';
import {
  StoryDescriptionMinLength,
  StoryTitleMaxLength,
  StoryTitleMinLength
} from '../config/constants';

export const createStorySchema: joi.ObjectSchema<ICreateStoryInput> =
  joi.object<ICreateStoryInput>({
    Title: joi
      .string()
      .min(StoryTitleMinLength)
      .max(StoryTitleMaxLength)
      .required()
      .messages({
        'string.base': 'Title must be a string',
        'any.required': 'Title is required',
        'string.min': 'The minimum length of Title is ' + StoryTitleMinLength,
        'string.max': 'The maximum length of Title is ' + StoryTitleMaxLength
      }),
    Description: joi
      .string()
      .min(StoryDescriptionMinLength)
      .required()
      .messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is required',
        'string.min':
          'The minimum length of Description is ' + StoryDescriptionMinLength
      })
  });

export const updateStorySchema: joi.ObjectSchema<IUpdateStoryInput> = joi
  .object<IUpdateStoryInput>({
    Title: joi
      .string()
      .min(StoryTitleMinLength)
      .max(StoryTitleMaxLength)
      .messages({
        'string.base': 'Title must be a string',
        'string.min': 'The minimum length of Title is ' + StoryTitleMinLength,
        'string.max': 'The maximum length of Title is ' + StoryTitleMaxLength
      }),
    Description: joi
      .string()
      .min(StoryDescriptionMinLength)
      .messages({
        'string.base': 'Description must be a string',
        'string.min':
          'The minimum length of Description is ' + StoryDescriptionMinLength
      })
  })
  .or('Title', 'Description')
  .messages({ 'object.missing': 'Title and Description are missing' });
