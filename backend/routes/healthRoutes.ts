import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';

const healthRouter = Router();

// Define the GET /api/health route
healthRouter.get('/health', healthCheck);

export default healthRouter;
