import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodObject, type ZodString } from 'zod';
import type { Writeable } from 'zod/v3';
import type { $strip } from 'zod/v4/core';
import logger from '../config/logger';

export const validate = (
  schema: ZodObject<Writeable<{ term: ZodString }>, $strip>,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Validation error:', errors);

        res.status(400).json({
          error: 'Validation Error',
          details: errors,
        });
        return;
      }

      logger.error('Unexpected validation error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred during validation process.',
      });
    }
  };
};
