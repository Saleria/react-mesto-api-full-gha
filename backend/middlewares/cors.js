const allowedCors = [
  'https://mesto.saleria.nomoredomainsmonster.ru',
  'https://api.mesto.saleria.nomoredomainsmonster.ru',
  'http://mesto.saleria.nomoredomainsmonster.ru',
  'http://localhost:3000',
  'https://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  res.set('Access-Control-Allow-Origin', '*');
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
