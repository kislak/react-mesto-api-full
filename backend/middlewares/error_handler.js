const errorHandler = (err, req, res, next) => {
  let {
    statusCode = 500,
    message = 'На сервере произошла ошибка'
  } = err;



  if (err.name === 'ValidationError') {
    statusCode = 404;
    message = `Переданы некорректные данные. ${err.message}`;
  }



  res.status(statusCode).send({ message: message });
  return next();
};

module.exports = errorHandler;
