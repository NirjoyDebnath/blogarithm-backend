import { appError } from './appError';
import { Request, Response, NextFunction } from 'express';

const tokenExpireError: appError = new appError(
  401,
  'Your session has been expired.'
);
const jsonWebTokenError: appError = new appError(
  401,
  'You are not authorised.'
);

export const globalErrorHandler = (
  err: appError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.isOperational === undefined || false) {
    const errorName: string = err.name;

    switch (errorName) {
      case 'TokenExpiredError':
        err = tokenExpireError;
        break;
      case 'JsonWebTokenError':
        err = jsonWebTokenError;
        break;
      default:
        err.statusCode = 500;
        err.message = 'Something went wrong';
        err.status = 'error';
    }
  } else if (err.isKnexError === true) {
    const errorName: string = err.name;
    switch (errorName) {
      case 'ER_DUP_ENTRY':
        const message: string = err.message;
        err.message =
          message.split(' ', 4).join(' ') + ' ' + message.split('_')[1];
        break;
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
