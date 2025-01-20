// routes/products.ts
import { Router } from 'express';
import {
  createProduct,
  getAllProducts
} from '../controllers/productController';
import { checkRole } from '../middlewares/roleMiddleware';

export const productsRouter = Router();

productsRouter.post('/new-product', createProduct);
productsRouter.get('/', getAllProducts);

productsRouter.put('/:id', checkRole('editor'), (req, res) => {
  // Logic for updating a product
});

productsRouter.delete('/:id', checkRole('editor'), (req, res) => {
  // Logic for deleting a product
});