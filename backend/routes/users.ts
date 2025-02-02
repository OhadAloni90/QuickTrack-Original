// users.ts
import { Router } from 'express';
import {
  getUserSettings,
  updateUserRole,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);

usersRouter.put('/:id/role', authMiddleware, checkRole('admin'), updateUserRole);

// Example of protecting a DELETE route with admin role
usersRouter.delete('/:id', checkRole('admin'), (req, res) => {
  // Logic for deleting a user
});