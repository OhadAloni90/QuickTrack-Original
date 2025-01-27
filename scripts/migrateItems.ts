import * as dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase, getDb, closeDatabaseConnection } from '../config/dbConnection';
import { ObjectId, Collection } from 'mongodb';

async function migrateItems() {
  try {
    // Connect to the database
    await connectToDatabase();
    const db = getDb();

    // Fetch all items from the 'items' collection
    const itemsCollection = db.collection('items');
    const usersCollection = db.collection('users');
    const itemsCursor = itemsCollection.find();

    // Process items in batches
    const batchSize = 100;
    let batch = [];

    while (await itemsCursor.hasNext()) {
      const item = await itemsCursor.next();
      batch.push(item);

      if (batch.length === batchSize) {
        await processBatch(batch, usersCollection, itemsCollection);
        batch = [];
      }
    }

    // Process any remaining items in the last batch
    if (batch.length > 0) {
      await processBatch(batch, usersCollection, itemsCollection);
    }

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close the database connection
    await closeDatabaseConnection();
  }
}

async function processBatch(batch: any[], usersCollection: Collection, itemsCollection: Collection) {
  const bulkOps = [];

  for (const item of batch) {
    const ownerId = item.ownerId;

    // Find the user by ownerId
    const user = await usersCollection.findOne({ _id: new ObjectId(ownerId) });

    if (user) {
      // Push the item into the user's items array
      bulkOps.push({
        updateOne: {
          filter: { _id: user._id },
          update: { $push: { items: item } }
        }
      });

      // Optionally flag the item as migrated
      bulkOps.push({
        updateOne: {
          filter: { _id: item._id },
          update: { $set: { migrated: true } }
        }
      });
    } else {
      console.log(`User with ID ${ownerId} not found. Skipping item with ID ${item._id}.`);
    }
  }

  if (bulkOps.length > 0) {
    await usersCollection.bulkWrite(bulkOps);
  }
}

// Execute the migration
migrateItems();