import { authRouter } from "./routes/auth";
import { productsRouter } from "./routes/products";
import { uploadsRouter } from "./routes/uploads";

const express = require('express');
const cors  = require('cors');

const { indexRouter } = require('./routes/index');
const { itemsRouter } = require('./routes/items');
const { usersRouter } = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/api/products', productsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/users/', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);

module.exports = app;
export default app;