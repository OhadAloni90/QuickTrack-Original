// users.ts
import { Router } from 'express';
import {
  getUserSettings,
  addItemToUser,
} from '../controllers/userController';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);
usersRouter.post('/:userId/items', addItemToUser);