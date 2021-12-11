const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorHandler = require('./middlewares/error_handler');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.get('/', (req, res) => res.send('Ответ на сигнал из далёкого космоса'));

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('server is up and running');
});
