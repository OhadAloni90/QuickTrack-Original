import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';

export const usersRouter = Router();

// GET /api/users
usersRouter.get('/', getAllUsers);

// POST /api/users
usersRouter.post('/', createUser);

// GET /api/users/:id
usersRouter.get('/:id', getUserById);

// PUT /api/users/:id
usersRouter.put('/:id', updateUser);

// DELETE /api/users/:id
usersRouter.delete('/:id', deleteUser);
