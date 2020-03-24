import { NextFunction } from "express";

export class ErrHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleErr = (err: any, res: any) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};

const throwErr = (statusCode: number, message: string, next: NextFunction) => {
  const error = new ErrHandler(statusCode, message);
  next(error);
};

export default throwErr;
