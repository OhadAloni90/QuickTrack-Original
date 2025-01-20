import { Router } from 'express';
import { upload } from '../config/multerConfig';
import { uploadMultiple } from '../controllers/uploadController';

export const uploadsRouter = Router();

// Define the POST route for multiple file uploads
uploadsRouter.post('/multiple', upload.array('files', 5), uploadMultiple);
