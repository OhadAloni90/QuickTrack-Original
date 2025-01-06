import * as dotenv from 'dotenv';

dotenv.config();

export function getDatabaseConfig() {
  const uri =  process.env['DB_URI'] || 'mongodb+srv://' + encodeURIComponent((process.env['USERNAME'] as string)) + ':' + encodeURIComponent((process.env['PASSWORD'] as string)) + '@cluster0.arqhl.mongodb.net' || process.env['DB_URI'] 
  const dbName = 'users'; // a separate env variable for the DB name
  return { uri, dbName };
}
