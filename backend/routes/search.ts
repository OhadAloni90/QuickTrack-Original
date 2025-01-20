import { Router } from 'express';
import { searchItems } from '../controllers/searchController';

const searchRouter = Router();

// Define the GET /api/search endpoint
searchRouter.get('/', searchItems);

export { searchRouter };
