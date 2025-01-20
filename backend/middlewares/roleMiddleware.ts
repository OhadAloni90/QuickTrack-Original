import { Request, Response, NextFunction } from 'express';

// Define a ranking system for roles
const roleRank = {
  viewer: 1,
  editor: 2,
  admin: 3
};

// Middleware to check if the user's role meets or exceeds the required role
export function checkRole(requiredRole: 'admin' | 'editor' | 'viewer') {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    // Check if the user's role is defined and meets the required role
    if (!userRole || roleRank[userRole] < roleRank[requiredRole]) {
      return res.status(403).json({ error: 'Forbidden - insufficient role' });
    }

    // Proceed to the next middleware or route handler
    next();
  };
}
