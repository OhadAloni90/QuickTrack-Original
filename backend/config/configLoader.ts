import * as dotenv from 'dotenv';

export function getDatabaseConfig() {
  if (!process.env['USERNAME'] || !process.env['PASSWORD']) {
    throw new Error('Missing USERNAME or PASSWORD environment variables.');
  }
  const uri = process.env['DB_URI'] || 'mongodb+srv://' + encodeURIComponent(process.env['USERNAME'] as string) + ':' + encodeURIComponent(process.env['PASSWORD'] as string) + '@cluster0.arqhl.mongodb.net';
  const dbName = 'users'; // a separate env variable for the DB name
  return { uri, dbName };
}