declare namespace Express {
  export interface Request {
    user?: {
      role: 'admin' | 'editor' | 'viewer';
    };
  }
}