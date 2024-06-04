export class appError extends Error {
  statusCode: number;
  isOperational: boolean = false;
  status: string = 'Error';
  code?: string;
  sqlMessage?: string;
  isKnexError: boolean;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = 'Fail';
    this.name = code || this.name;
    this.isKnexError = code !== undefined;
  }
}
