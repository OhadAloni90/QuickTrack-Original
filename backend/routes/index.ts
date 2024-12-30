import { Router, Request, Response } from 'express';

export const indexRouter = Router();

// Basic placeholder route
indexRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to QuickTrack API!' });
});
