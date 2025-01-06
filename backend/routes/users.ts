// users.ts
import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserSettings,
  getUserItems,
  updateUserSettings
} from '../controllers/userController';

export const usersRouter = Router();
usersRouter.get('/settings/:id', getUserSettings);
usersRouter.get('/:id/items', getUserItems);
// usersRouter.get('/', getAllUsers);
// usersRouter.post('/', createUser);
// usersRouter.get('/:id', getUserById);
// usersRouter.put('/:id', updateUser);
// usersRouter.delete('/:id', deleteUser);
