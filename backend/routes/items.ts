import { Router } from 'express';
import {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem
} from '../controllers/itemController';

export const itemsRouter = Router();

// GET /api/items
itemsRouter.get('/', getAllItems);

// POST /api/items
itemsRouter.post('/', createItem);

// GET /api/items/:id
itemsRouter.get('/:id', getItemById);

// PUT /api/items/:id
itemsRouter.put('/:id', updateItem);

// DELETE /api/items/:id
itemsRouter.delete('/:id', deleteItem);
