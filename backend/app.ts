import { authRouter } from "./routes/auth";
import { productsRouter } from "./routes/products";

const express = require('express');
const cors  = require('cors');

const { indexRouter } = require('./routes/index');
const { usersRouter } = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/api/products', productsRouter);
app.use('/api/users/', usersRouter);
app.use('/api/auth', authRouter);

module.exports = app;
export default app;