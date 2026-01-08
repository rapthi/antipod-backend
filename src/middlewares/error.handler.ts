import type { NextFunction, Request, Response } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignored using `--suppress`
  req: Request,
  res: Response,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignored using `--suppress`
  next: NextFunction,
) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
