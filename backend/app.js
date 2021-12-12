require('dotenv').config();

const {
  PORT = 3000,
  CORS_ORIGIN = 'http://localhost:3000 http://localhost:3001 http://kurs.nomoredomains.rocks https://kurs.nomoredomains.rocks',
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorHandler = require('./middlewares/error_handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./errors/not_found');

const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.get('/', (req, res) => res.send('Ответ на сигнал из далёкого космоса'));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const corsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use('/', authRouter);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('server is up and running');
});
