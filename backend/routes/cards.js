const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
});

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);

router.delete('/:id', idValidator, deleteCard);
router.put('/:id/likes', idValidator, likeCard);
router.delete('/:id/likes', idValidator, dislikeCard);

module.exports = router;
