import { MongoClient, Db } from 'mongodb';
import { getDatabaseConfig } from './configLoader';

let client: MongoClient;
let db: Db;

/**
 * Connects to MongoDB using the official MongoDB driver.
 * @returns {Promise<Db>} The database reference
 */
export async function connectToDatabase(): Promise<Db> {
  const { uri, dbName } = getDatabaseConfig();

  client = new MongoClient(uri);
  await client.connect();

  console.log('Connected to MongoDB:', uri);

  db = client.db(dbName);
  return db;
}

/**
 * Returns the MongoDB database reference after connection.
 * @throws Error if connectToDatabase() has not been called yet.
 */
export function getDb(): Db {
  if (!db) {
    throw new Error('No database client. Did you call connectToDatabase()?');
  }
  return db;
}

/**
 * Closes the MongoDB client connection.
 */
export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}
