require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { login } = require('./controllers/user');
const { createUser } = require('./controllers/user');
const { loginValidatoin, createUserValidation } = require('./middlewares/validator');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// const allowedCors = [
// 'https://mesto.saleria.nomoredomainsmonster.ru',
// 'https://api.mesto.saleria.nomoredomainsmonster.ru',
// 'http://mesto.saleria.nomoredomainsmonster.ru',
// 'http://localhost:3000',
// 'https://localhost:3000',
// ];
// const corsOptions = {
// origin: allowedCors,
// methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// allowedHeaders: 'Accept,Content-Type,Origin,Authorization',
//  exposedHeaders: 'Authorization',
// };

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', loginValidatoin, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listenin on port ${PORT}`);
});
