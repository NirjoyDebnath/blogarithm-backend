export class AppError extends Error {
  statusCode: number;
  isOperational: boolean = false;
  status: string = 'Error';
  code?: string;
  sqlMessage?: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    if (statusCode >= 400 && statusCode < 500) this.status = 'Fail';
    this.name = code || this.name;
  }
}
