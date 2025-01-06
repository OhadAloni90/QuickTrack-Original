// users.ts
import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

export const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);
