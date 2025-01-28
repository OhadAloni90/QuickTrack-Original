declare namespace Express {
  export interface Request {
    user?: {
      role: 'admin' | 'editor' | 'viewer';
      // Add other user properties here if needed
    };
  }
}
