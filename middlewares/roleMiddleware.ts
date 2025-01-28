import { Request, Response, NextFunction } from 'express';

// Define roleRank with explicit types
const roleRank: { [key in 'viewer' | 'editor' | 'admin']: number } = {
  viewer: 1,
  editor: 2,
  admin: 3
};

// Middleware function to check user role
export function roleMiddleware(requiredRole: 'admin' | 'editor' | 'viewer') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role as 'admin' | 'editor' | 'viewer' | undefined;

    if (!userRole || roleRank[userRole] < roleRank[requiredRole]) {
      res.status(403).json({ error: 'Forbidden - insufficient role' });
      return;
    }

    next();
  };
}