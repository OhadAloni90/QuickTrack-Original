import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/dbConnection';

/**
 * GET /api/users
 * Fetch all users from the 'users' collection.
 */
export async function getAllUsers(req: Request, res: Response) {
  try {
    const db = getDb();
    const users = await db.collection('users').find().toArray();
    res.json({ users });
  } catch (error) {
    console.error('[getAllUsers]', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

/**
 * POST /api/users
 * Create a new user in the 'users' collection.
 */
export async function createUser(req: Request, res: Response) {
  try {
    const userData = req.body; // Validate or sanitize as needed
    const db = getDb();
    const result = await db.collection('users').insertOne(userData);
    res.status(201).json({ success: true, userId: result.insertedId });
  } catch (error) {
    console.error('[createUser]', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

/**
 * GET /api/users/:id
 * Fetch a single user by ID.
 */
export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('[getUserById]', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

/**
 * PUT /api/users/:id
 * Update an existing user by ID.
 */
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body; // Validate or sanitize as needed
    const db = getDb();

    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' } // returns the updated document
    );

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, updatedUser: result });
  } catch (error) {
    console.error('[updateUser]', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

/**
 * DELETE /api/users/:id
 * Remove a user from the 'users' collection.
 */
export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const db = getDb();

    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('[deleteUser]', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}
