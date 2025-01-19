// routes/auth.ts
import { Router } from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);