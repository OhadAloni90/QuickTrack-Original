// users.ts
import { Router } from 'express';
import {
  getUserSettings,
} from '../controllers/userController';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);
