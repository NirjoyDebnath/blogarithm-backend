export class appError extends Error {
  statusCode: number;
  isOperational: boolean;
  logging: boolean;

  constructor(statusCode) {
    super();
  }
}
