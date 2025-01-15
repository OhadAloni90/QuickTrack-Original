// controllers/productController.ts
import { Request, Response } from 'express';
import { getDb } from '../config/dbConnection'; // or use Mongoose if you prefer

export async function createProduct(req: Request, res: Response) {
  try {
    const productData = req.body;
    // Validate or sanitize productData if needed
    const db = getDb();
    const result = await db.collection('products').insertOne(productData);
    return res.status(201).json({ success: true, productId: result.insertedId });
  } catch (error) {
    console.error('[createProduct]', error);
    return res.status(500).json({ error: 'Failed to create product' });
  }
}

export async function getAllProducts(req: Request, res: Response) {
    try {
      const db = getDb();
      const items = await db.collection('products').find().toArray();
      res.json({ items });
    } catch (error) {
      console.error('[getAllProducts]', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  
