// controllers/authController.ts
import { Request, Response } from 'express';
import { getDb } from '../config/dbConnection';
import { ObjectId } from 'mongodb';

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    // 1) Validate
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    // 2) Find user in DB
    const db = getDb();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // 3) Check password (in real code, do hashing)
    if (user['password'] !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // 4) Return success + maybe a token
    return res.json({ success: true, userId: user._id, message: 'Logged in' });
  } catch (error) {
    console.error('[loginUser]', error);
    return res.status(500).json({ error: 'Failed to log in' });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    const userId = req.headers['user-id'] as string;
    if (!userId || !ObjectId.isValid(userId)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const db = getDb();
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { LastLogout: new Date() } }
    );

    return res.json({ success: true });
  } catch (error) {
    console.error('[logoutUser]', error);
    return res.status(500).json({ error: 'Failed to log out' });
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body; 
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const db = getDb();
    // Insert user doc
    const result = await db.collection('users').insertOne({
      username,
      email,
      password, // in real life, hash it
      settings: { theme: 'dark', notifications: true }, // default settings
      createdAt: new Date()
    });

    return res.status(201).json({ success: true, userId: result.insertedId });
  } catch (error) {
    console.error('[registerUser]', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
}