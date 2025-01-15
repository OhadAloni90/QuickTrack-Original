import { Router } from 'express';
import { searchItems } from '../controllers/itemController';

const router = Router();

// Define the route for searching items
router.get('/items/search', searchItems);

export default router;
