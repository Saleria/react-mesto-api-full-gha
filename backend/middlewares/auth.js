const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-err');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
