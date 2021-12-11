const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    statusCode = 404;
    message = `Переданы некорректные данные. ${err.message}`;
  }

  res.status(statusCode).send({ message: (statusCode === 500 ? 'На сервере произошла ошибка' : message) });
  return next();
};

module.exports = errorHandler;