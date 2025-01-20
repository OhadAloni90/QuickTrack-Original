import { Request, Response } from 'express';
import { getDb } from '../config/dbConnection';

export async function searchItems(req: Request, res: Response) {
  try {
    const { q, category, priceMin, priceMax, page = 1, limit = 20 } = req.query;

    const query: any = {};

    // If category specified
    if (category) {
      query.category = category;
    }

    // If price range is specified
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // If text search is specified
    if (q) {
      query.$text = { $search: q as string };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const db = getDb();
    const collection = db.collection('products');

    const items = await collection.find(query).skip(skip).limit(Number(limit)).toArray();
    const totalCount = await collection.countDocuments(query);

    return res.json({ items, totalCount });
  } catch (err) {
    console.error('[searchItems]', err);
    res.status(500).json({ error: 'Failed to search items' });
  }
}
