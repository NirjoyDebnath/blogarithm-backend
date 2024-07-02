import { AppError } from './appError';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from './responses';
import { HttpStatusCode } from '../enums/httpStatusCodes';

const tokenExpireError: AppError = new AppError(
  HttpStatusCode.UNAUTHORIZED,
  'Your session has been expired.'
);
const jsonWebTokenError: AppError = new AppError(
  HttpStatusCode.UNAUTHORIZED,
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
  // eslint-disable-next-line no-console
  console.log(err.name, err.isOperational, err);
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
        err.statusCode = HttpStatusCode.BAD_REQUEST;
        err.message = parseMessage(err.name, err.sqlMessage!);
        err.status = 'Fail';
        break;
      //ER_BAD_FIELD_ERROR
      default:
        err.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
        err.message = 'Something went wrong';
        err.status = 'error';
    }
  }
  sendResponse(req, res, err.statusCode, err.status + ': ' + err.message);
};
