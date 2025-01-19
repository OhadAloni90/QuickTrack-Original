import { Request, Response } from 'express';

/**
 * Handles GET requests to /api/health and responds with a JSON object indicating server status.
 */
export function healthCheck(req: Request, res: Response) {
  res.status(200).json({ status: 'ok' });
}
