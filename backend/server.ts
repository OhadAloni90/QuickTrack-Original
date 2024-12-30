import { app } from './app';
import { connectToDatabase } from './config/dbConnection';

const PORT = process.env['PORT'] || 3000;

(async () => {
  try {
    // Connect to MongoDB before starting the server
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
})();
