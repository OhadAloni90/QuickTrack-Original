import { Router } from 'express';
import { searchItems, getItemById } from '../controllers/itemController';

const router = Router();

// Define the route for searching items
router.get('/items/search', searchItems);

router.get('/items/:id', getItemById);

export default router;