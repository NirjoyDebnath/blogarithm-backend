import joi from 'joi';
import { IUpdatePasswordUserInput, IUpdateUserInput } from '../interfaces/user';
import {
  NameMaxLength,
  NameMinLength,
  NamePattern,
  PasswordPattern,
  UserNameMaxLength,
  UserNameMinLength
} from '../config/constants';

export const updateUserSchema: joi.ObjectSchema<IUpdateUserInput> = joi
  .object<IUpdateUserInput>({
    UserName: joi
      .string()
      .alphanum()
      .min(UserNameMinLength)
      .max(UserNameMaxLength)
      .messages({
        'string.alphanum': 'UserName must only contain characters and numbers',
        'string.base': 'UserName must be a string',
        'string.min': 'The minimum length of UserName is ' + UserNameMinLength,
        'string.max': 'The maximum length of UserName is ' + UserNameMaxLength
      }),
    Email: joi.string().email(),
    Name: joi
      .string()
      .min(NameMinLength)
      .max(NameMaxLength)
      .pattern(NamePattern)
      .trim()
      .messages({
        'string.pattern.base': 'Name must only contain characters and .',
        'string.base': 'UserName must be a string',
        'string.min': 'The minimum length of Name is ' + NameMinLength,
        'string.max': 'The maximum length of Name is ' + NameMaxLength
      })
  })
  .or('UserName', 'Email', 'Name')
  .messages({ 'object.missing': 'UserName, Email and Name are missing' });

export const updatePasswordSchema: joi.ObjectSchema<IUpdatePasswordUserInput> =
  joi.object<IUpdatePasswordUserInput>({
    CurrentPassword: joi.required().messages({
      'any.required': 'CurrentPassword is required'
    }),
    NewPassword: joi.string().pattern(PasswordPattern).required().messages({
      'string.pattern.base':
        'The minimum length of Password is 8 and it must contain atleast one character and one number',
      'any.required': 'NewPassword is required'
    })
  });
