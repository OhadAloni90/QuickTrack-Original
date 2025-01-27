// controllers/productController.ts
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { getDb } from '../config/dbConnection'; // or use Mongoose if you prefer


export async function updateProductRecommended(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    const db = getDb();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const newRecommendedStatus = !product["recommended"];
    await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: { recommended: newRecommendedStatus } }
    );
    return res.json({ success: true, recommended: newRecommendedStatus });
  } catch (error) {
    console.error('[updateProductRecommended]', error);
    return res.status(500).json({ error: 'Failed to update recommended status' });
  }
}

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