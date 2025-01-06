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
  console.log('Connected to MongoDB:', uri);
  client = new MongoClient(uri as string);
  await client.connect();
  console.log('Connected to MongoDB:', uri);
  db = client.db(dbName);
  console.log(db)
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

export async function seedUsers() {
  try {
    // 1) Connect to the database (reuses your existing connection logic)
    await connectToDatabase();
    const db = getDb();

    // 2) Insert some fake users
    // You can use static data or a library like Faker.js
    const seedData = [
      { username: 'Alice', email: 'alice@example.com' },
      { username: 'Bob', email: 'bob@example.com' },
      { username: 'Carol', email: 'carol@example.com' },
    ];

    // Clear existing collection (optional)
    // await db.collection('users').deleteMany({});

    // Insert seed data
    const result = await db.collection('users').insertMany(seedData);
    console.log(`Seeded ${result.insertedCount} user(s) into database.`);
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    // 3) Optionally close the DB connection so the script ends
    // If you prefer to keep connection open in dev, remove this
    process.exit(0);
  }
}
