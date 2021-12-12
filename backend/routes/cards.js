const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValidator } = require('./joi_custom_validators');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
}), createCard);

router.delete('/:id', idValidator, deleteCard);
router.put('/:id/likes', idValidator, likeCard);
router.delete('/:id/likes', idValidator, dislikeCard);

module.exports = router;
