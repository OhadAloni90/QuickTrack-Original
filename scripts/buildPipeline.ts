import { exec } from 'child_process';
import { existsSync, copySync } from 'fs-extra';
import { statSync } from 'fs';
import path from 'path';

// Paths
const angularJsonPath = path.join(__dirname, '../angular.json');
const distPath = path.join(__dirname, '../dist/quick-track');
const publicPath = path.join(__dirname, '../backend/public');

// Check if angular.json exists
if (!existsSync(angularJsonPath)) {
  console.error('Error: Angular project not found.');
  process.exit(1);
}

// Function to check if build is necessary
function isBuildNecessary(): boolean {
  try {
    const distStat = statSync(distPath);
    const angularJsonStat = statSync(angularJsonPath);
    return angularJsonStat.mtime > distStat.mtime;
  } catch {
    return true; // If any error occurs, assume build is necessary
  }
}

// Run build if necessary
if (isBuildNecessary()) {
  console.log('Building Angular project...');
  exec('npm run build', { cwd: path.join(__dirname, '../frontend') }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Build error: ${stderr}`);
      process.exit(1);
    }
    console.log(stdout);

    // Copy dist to backend/public
    try {
      copySync(distPath, publicPath);
      console.log('Build output copied to backend/public.');
    } catch (copyError) {
      console.error(`Error copying files: ${copyError}`);
      process.exit(1);
    }
  });
} else {
  console.log('No changes detected in frontend. Skipping build.');
}
