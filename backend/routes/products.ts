// routes/products.ts
import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  updateProductRecommended
} from '../controllers/productController';

export const productsRouter = Router();

productsRouter.post('/new-product', createProduct);
productsRouter.get('/', getAllProducts);
productsRouter.put('/:id/recommended', updateProductRecommended);