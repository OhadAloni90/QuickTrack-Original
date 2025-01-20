import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = { role: decoded.role };
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Failed to authenticate token' });
  }
}