// users.ts
import { Router } from 'express';
import {
  getUserSettings,
  updateUserSettings
} from '../controllers/userController';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);
usersRouter.put('/settings/:id', updateUserSettings);