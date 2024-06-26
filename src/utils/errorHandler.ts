import { ENV } from '../config/conf';
import { AppError } from './appError';
import { Request, Response, NextFunction } from 'express';

const tokenExpireError: AppError = new AppError(
  401,
  'Your session has been expired.'
);
const jsonWebTokenError: AppError = new AppError(
  401,
  'You are not authorised.'
);

const parseMessage = (errorName: string, errorMessage: string): string => {
  switch (errorName) {
    case 'ER_DUP_ENTRY':
      const message: string = errorMessage;
      errorMessage =
        message.split(' ', 4).join(' ') + ' ' + message.split('_')[1];
      break;
  }
  return errorMessage;
};

export const handleGlobalError = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (ENV.Environment === 'development') {
    // eslint-disable-next-line no-console
    console.log(err.name, err.isOperational, err);
  }
  if (err.isOperational === undefined || false) {
    const errorName: string = err.code || err.name;

    switch (errorName) {
      case 'TokenExpiredError':
        err = tokenExpireError;
        break;
      case 'JsonWebTokenError':
        err = jsonWebTokenError;
        break;
      case 'ER_DUP_ENTRY':
        err.statusCode = 400;
        err.message = parseMessage(err.name, err.sqlMessage!);
        err.status = 'Fail';
        break;
      //ER_BAD_FIELD_ERROR
      default:
        err.statusCode = 500;
        err.message = 'Something went wrong';
        err.status = 'error';
    }
  }
  res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message, name: err.name });
};
