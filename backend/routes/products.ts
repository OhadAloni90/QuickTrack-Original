// routes/products.ts
import { Router } from 'express';
import {
  createProduct,
  getAllProducts
} from '../controllers/productController';

export const productsRouter = Router();

productsRouter.post('/new-product', createProduct);
productsRouter.get('/', getAllProducts)