import * as dotenv from 'dotenv';

dotenv.config();

export function getDatabaseConfig() {
  const uri = process.env['DB_URI'] || 'mongodb://localhost:27017';
  const dbName = process.env['DB_URI'] || 'QuickTrace';

  return { uri, dbName };
}
