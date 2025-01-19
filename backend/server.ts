import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/dbConnection';
import healthRoutes from './routes/healthRoutes';

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);

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