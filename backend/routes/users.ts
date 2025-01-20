// users.ts
import { Router } from 'express';
import {
  getUserSettings,
  getUserStats,
} from '../controllers/userController';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);
usersRouter.get('/statistics', getUserStats);