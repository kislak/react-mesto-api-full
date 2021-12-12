const errorHandler = (err, req, res, next) => {
  let {
    statusCode = 500,
    message = 'На сервере произошла ошибка',
  } = err;

  res.status(statusCode).send({ message });
  return next();
};

module.exports = errorHandler;
