import { Router } from 'express';
import {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  uploadItemFiles
} from '../controllers/itemController';
import { upload } from '../config/multerConfig';

export const itemsRouter = Router();

// GET /api/items
itemsRouter.get('/all', getAllItems);
itemsRouter.post('/', upload.array('files', 5), createItem);
itemsRouter.post('/:id/upload', upload.array('files', 5), uploadItemFiles);
itemsRouter.get('/:id', getItemById);
itemsRouter.put('/:id', updateItem);
itemsRouter.delete('/:id', deleteItem);