const Card = require('../models/card');
const { OK, CREATED_OK } = require('../responses/responses');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link, likes } = req.body;
  const owner = req.user._id;
  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.status(CREATED_OK).send({
      name: card.name,
      link: card.link,
      _id: card._id,
      owner: card.owner,
      likes: card.likes,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не можете удалить карточку другого пользователя'));
      } return card.deleteOne()
        .then(() => {
          res.status(OK).send({ message: 'Карточка успешно удалена' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
