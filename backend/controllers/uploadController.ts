import { Request, Response } from 'express';
import { upload } from '../config/multerConfig';
import { getDb } from '../config/dbConnection';
import { ObjectId } from 'mongodb';

// Function to handle multiple file uploads
export async function uploadMultiple(req: Request, res: Response) {
  try {
    const files = req.files as Express.Multer.File[];
    const db = getDb();
    const itemId = req.body.itemId; // Assuming itemId is sent in the request body

    if (!ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID format' });
    }

    const fileMetadata = files.map(file => ({
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
      itemId: new ObjectId(itemId)
    }));

    // Insert file metadata into the database
    const result = await db.collection('uploads').insertMany(fileMetadata);

    return res.json({
      success: true,
      files: result.ops.map(file => ({
        originalname: file.originalname,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        path: file.path
      }))
    });
  } catch (error) {
    console.error('[uploadMultiple]', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
