const express = require('express');
// Import example routes (placeholder)
import * as usersRouter from './routes/users';
import * as itemsRouter from './routes/items';
import * as indexRouter from './routes/index'
export const app = express();

// Middleware: parse JSON body (if needed)
app.use(express.json());

// Example: serve static files (if you have a frontend build, e.g., Angular dist)
// app.use(express.static(path.join(__dirname, '../public')));

// Register routes
app.use('/', indexRouter.indexRouter);
app.use('/api/items', itemsRouter.itemsRouter);
app.use('/api/users', usersRouter.usersRouter);
// Fallback for unknown routes
app.use((req: any, res: any) => {
  res.status(404).json({ error: 'Not Found' });
});
