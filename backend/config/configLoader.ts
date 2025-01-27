import * as fs from 'fs';
import * as path from 'path';

function loadConfig() {
  const env = process.env['NODE_ENV'] || 'development';
  const configPath = env === 'production' ? 'config.prod.json' : 'config.dev.json';
  const configFile = path.resolve(__dirname, configPath);
  const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  return config;
}

const config = loadConfig();

export function getDatabaseConfig() {
  const uri = config.DB_URI;
  const dbName = 'users'; // Assuming dbName is constant
  return { uri, dbName };
}