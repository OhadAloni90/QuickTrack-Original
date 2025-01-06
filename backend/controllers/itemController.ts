import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase, getDb, seedUsers} from '../config/dbConnection';

/**
 * GET /api/items
 * Fetch all items from the 'items' collection.
 */
export async function getAllItems(req: Request, res: Response) {
  try {
    const db = getDb();
    const items = await db.collection('items').find().toArray();
    res.json({ items });
  } catch (error) {
    console.error('[getAllItems]', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}

/**
 * POST /api/items
 * Create a new item in the 'items' collection.
 */
// itemController.ts
export async function createItem(req: Request, res: Response) {
  try {
    const newItem = req.body; 
    // e.g., { name, price, description, ownerId }
    const db = getDb();
    // Convert the ownerId to an ObjectId if needed
    newItem.ownerId = new ObjectId(newItem.ownerId);
    const result = await db.collection('items').insertOne(newItem);
    res.status(201).json({ success: true, itemId: result.insertedId });
  } catch (error) {
    console.error('[createItem]', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
}
/**
 * GET /api/items/:id
 * Fetch a single item by ID.
 */
export async function getItemById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ID:', id);
      return res.status(400).json({ error: 'Invalid item ID format' });
    }
    const db = getDb();
    const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ item });
  } catch (error) {
    console.error('[getItemById]', error);
    return res.status(500).json({ error: 'Failed to fetch item' });
  }
}
/**
 * PUT /api/items/:id
 * Update an existing item by ID.
 */
export async function updateItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = getDb();

    const result = await db.collection('items').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ success: true, updatedItem: result }); // Explicit return
  } catch (error) {
    console.error('[updateItem]', error);
    return res.status(500).json({ error: 'Failed to update item' }); // Explicit return
  }
}

/**
 * DELETE /api/items/:id
 * Remove an item from the 'items' collection.
 */
export async function deleteItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const db = getDb();

    const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ success: true }); // Explicit return
  } catch (error) {
    console.error('[deleteItem]', error);
    return res.status(500).json({ error: 'Failed to delete item' }); // Explicit return
  }
  
}
async function seedItems() {
  try {
    // 1) Connect to your DB (using your existing connectToDatabase logic)
    await connectToDatabase();
    const db = getDb();
    // 2) Define your 4 fake items
    const itemsToInsert = [
      { name: 'Test Item #1', price: 9.99, description: 'First fake item' },
      { name: 'Test Item #2', price: 14.99, description: 'Second fake item' },
      { name: 'Test Item #3', price: 19.99, description: 'Third fake item' },
      { name: 'Test Item #4', price: 29.99, description: 'Fourth fake item' },
    ];
    // 3) Insert them all at once
    const result = await db.collection('items').insertMany(itemsToInsert);
    console.log(`Inserted ${result.insertedCount} items into "items" collection.`);
    // 4) Optionally exit the process or close the DB connection
    process.exit(0);
  } catch (error) {
    console.error('Error seeding items:', error);
    process.exit(1);
  }
}
