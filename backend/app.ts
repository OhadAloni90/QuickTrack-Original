const express = require('express');
const cors  = require('cors');

const { indexRouter } = require('./routes/index');
const { itemsRouter } = require('./routes/items');
const { usersRouter } = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/api/items', itemsRouter);
app.use('/api/users/', usersRouter);

module.exports = app;
export default app;
