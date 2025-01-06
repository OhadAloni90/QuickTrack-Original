import { Router } from 'express';
import {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

export const itemsRouter = Router();

// GET /api/items
itemsRouter.get('/list', getAllItems);
itemsRouter.post('/', createItem);
itemsRouter.get('/:id', getItemById);
itemsRouter.put('/:id', updateItem);
itemsRouter.delete('/:id', deleteItem);

