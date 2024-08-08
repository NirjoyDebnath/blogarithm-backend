import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { updateUserSchema, updatePasswordSchema } from '../schemas/userSchema';
import { signUpUserSchema, logInUserSchema } from '../schemas/authSchema';
import { createStorySchema, updateStorySchema } from '../schemas/storySchema';
import { commentStorySchema } from '../schemas/commentSchema';

const getSchema = (req: Request) => {
  const path: string = req.originalUrl;
  const method: string = req.method;

  switch (true) {
    case path.startsWith('/api/users') && method === 'PUT':
      return updateUserSchema;
    case path.startsWith('/api/users') && method === 'PATCH':
      return updatePasswordSchema;
    case path.startsWith('/api/auth/signUp') && method === 'POST':
      return signUpUserSchema;
    case path.startsWith('/api/auth/logIn') && method === 'POST':
      return logInUserSchema;
    case path.startsWith('/api/story') && method === 'POST':
      return createStorySchema;
    case path.startsWith('/api/story') && method === 'PATCH':
      return updateStorySchema;
    case path.startsWith('/api/comment') && method === 'POST':
        return commentStorySchema;
    default:
      return joi.object();
  }
};

export const validateData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = getSchema(req);
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
