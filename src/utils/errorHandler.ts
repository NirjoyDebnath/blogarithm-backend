import { AppError } from './appError';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from './responses';

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
  }
  parseMessage(err.name, err.message);
  sendResponse(req, res, err.statusCode, err.status + ': ' + err.message);
};
