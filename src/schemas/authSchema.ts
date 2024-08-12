import joi from 'joi';
import { ILogInAuthInputType, ISignUpUserInputType } from '../interfaces/auth';
import {
  NameMaxLength,
  NameMinLength,
  NamePattern,
  PasswordPattern,
  UserNameMaxLength,
  UserNameMinLength
} from '../config/constants';

export const signUpUserSchema: joi.ObjectSchema<ISignUpUserInputType> =
  joi.object<ISignUpUserInputType>({
    UserName: joi
      .string()
      .alphanum()
      .min(UserNameMinLength)
      .max(UserNameMaxLength)
      .required()
      .messages({
        'string.alphanum': 'UserName must only contain characters and numbers',
        'string.base': 'UserName must be a string',
        'any.required': 'UserName is required',
        'string.min': 'The minimum length of UserName is ' + UserNameMinLength,
        'string.max': 'The maximum length of UserName is ' + UserNameMaxLength
      }),
    Email: joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'any.required': 'Email is required'
    }),
    Name: joi
      .string()
      .min(NameMinLength)
      .max(NameMaxLength)
      .pattern(NamePattern)
      .trim()
      .required()
      .messages({
        'string.pattern.base': 'Name must only contain characters and .',
        'string.base': 'Name must be a string',
        'any.required': 'Name is required',
        'string.min': 'The minimum length of Name is ' + NameMinLength,
        'string.max': 'The maximum length of Name is ' + NameMaxLength
      }),
    Password: joi.string().pattern(PasswordPattern).required().messages({
      'string.pattern.base':
        'The minimum length of Password is 8 and it must contain atleast one character and one number',
      'string.base': 'Password must be a string',
      'any.required': 'Password is required'
    })
  });

export const logInUserSchema: joi.ObjectSchema<ILogInAuthInputType> =
  joi.object<ILogInAuthInputType>({
    UserName: joi
      .string()
      // .alphanum()
      // .min(1)
      // .max(15)
      .required(),
    Password: joi.string().pattern(PasswordPattern,).required().messages({'string.pattern.base':"Incorrect username or password"})
  });
