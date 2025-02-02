// routes/products.ts
import { Router } from 'express';
import {
  createProduct,
  getAllProducts
} from '../controllers/productController';
import { checkRole } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

export const productsRouter = Router();

productsRouter.post('/new-product', createProduct);
productsRouter.get('/', getAllProducts);

productsRouter.put('/:id', authMiddleware, checkRole('editor'), (req, res) => {
  // Logic for updating a product
});

productsRouter.delete('/:id', authMiddleware, checkRole('editor'), (req, res) => {
  // Logic for deleting a product
});