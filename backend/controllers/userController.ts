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
    console.log(db)
    const users = await db.collection('users').find().toArray();
    res.json({ users });
  } catch (error) {
    console.error('[getAllUsers]', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
// GET /api/users/settings
export async function getUserSettings(req: Request, res: Response) {
  try {
    // For simplicity, let's assume we fetch user #1 or from a param
    // In real apps, you'd parse user ID from auth token or session
    const id = req.params['id'];
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Return just the settings field
    return res.json({ settings: user['settings'] });
  } catch (error) {
    console.error('[getUserSettings]', error);
    return res.status(500).json({ error: 'Failed to fetch user settings' });
  }
}

// PUT /api/users/settings
export async function updateUserSettings(req: Request, res: Response) {
  try {
    const newSettings = req.body; // { theme, notifications } etc.
    const userId = 'someObjectId'; 
    const db = getDb();
    console.log(db)
    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { settings: newSettings } },
      { returnDocument: 'after' }
    );

    if ( result &&  !result['value']) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ success: true, settings:  result && result['value']['settings'] });
  } catch (error) {
    console.error('[updateUserSettings]', error);
    return res.status(500).json({ error: 'Failed to update user settings' });
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
    // 1) Validate the ID
    const id = req.params['id'];
    if (!ObjectId.isValid(id)) {
      console.log('id',id)
      return res.status(400).json({ error: 'Invalid user ID format' });
      // return statement here ensures we exit the function
    }

    // 2) Fetch from DB
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
      // return here too
    }

    // 3) Return user
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user' });
    // return here as well
  }
}


/**
 * PUT /api/users/:id
 * Update an existing user by ID.
 */
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = getDb();

    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' } // returns the updated document
    );

    if (!result) {
      return res.status(404).json({ error: 'User not found' }); // Explicit return
    }

    return res.json({ success: true, updatedUser: result }); // Explicit return
  } catch (error) {
    console.error('[updateUser]', error);
    return res.status(500).json({ error: 'Failed to update user' }); // Add return
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
      return res.status(404).json({ error: 'User not found' }); // Explicit return
    }

    return res.json({ success: true }); // Explicit return
  } catch (error) {
    console.error('[deleteUser]', error);
    return res.status(500).json({ error: 'Failed to delete user' }); // Add return
  }
}
