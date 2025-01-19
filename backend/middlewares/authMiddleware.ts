import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['user-id'] as string;
  if (userId && ObjectId.isValid(userId)) {
    req.userId = userId;
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}