import { Request, Response, NextFunction } from 'express';

export const wrapAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => void | Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
