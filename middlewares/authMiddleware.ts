import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Simulate decoding a token and assigning a user role
  const decoded = { role: 'viewer' }; // This is a placeholder for actual decoding logic

  // Assign the decoded role to req.user
  req.user = { role: decoded.role };

  // Proceed to the next middleware
  next();
}
