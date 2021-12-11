const Card = require('../models/card');

const STATUS_OK = 200;

const { NotFoundError } = require('../errors/not_found');
const { ForbiddenError } = require('../errors/forbidden');

const sendCard = (res, card) => {
  if (card) {
    return res.status(STATUS_OK).send(card);
  }
  throw new NotFoundError('Запрашиваемая каточка не найдена');
};

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(STATUS_OK).send(cards))
  .catch(next);

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findOne({ _id: id })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Пользоватьель не авторизован'));
      }

      return card.delete().then((result) => sendCard(res, result));
    }).catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((result) => sendCard(res, result))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((result) => sendCard(res, result))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
    .then((result) => sendCard(res, result))
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
