// users.ts
import { Router } from 'express';
import {
  getUserSettings,
} from '../controllers/userController';
import { checkRole } from '../middlewares/roleMiddleware';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);

// Example of protecting a DELETE route with admin role
usersRouter.delete('/:id', checkRole('admin'), (req, res) => {
  // Logic for deleting a user
});