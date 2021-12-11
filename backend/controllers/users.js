const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const STATUS_OK = 200;
const { JWT_SECRET = 'some-secret-key' } = process.env;

const { NotFoundError } = require('../errors/not_found');
const { UnauthorizedError } = require('../errors/unauthorized');
const { ConflictError } = require('../errors/conflict');

const sendUser = (res, user) => {
  if (user) {
    return res.status(STATUS_OK).send(user);
  }

  throw new NotFoundError('Запрашиваемая каточка не найдена');
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((encryptedPassword) => User.create({
      name,
      about,
      avatar,
      email,
      password: encryptedPassword,
    }))
    .then(() => res.status(STATUS_OK).send({ message: 'Пользователь успешно зарегистрирован!' }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictError(err.message));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .send({ token: token, message: 'Аутентификация прошла успешно!' });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const getUser = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .then((user) => sendUser(res, user))
    .catch(next);
};

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(STATUS_OK).send(users))
  .catch(next);

const getUserByID = (req, res, next) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => sendUser(res, user))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const id = req.user._id;
  const {
    name,
    about,
  } = req.body;

  return User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => sendUser(res, user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  return User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => sendUser(res, user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUser,
};
