// users.ts
import { Router } from 'express';
import {
  getUserSettings,
  updateUser,
} from '../controllers/userController';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);
usersRouter.put('/update', updateUser);