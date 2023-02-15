require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/mestodb', JWT_SECRET } = process.env;

console.log(JWT_SECRET);

mongoose.connect(DATA_BASE);

app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(/https?:\/\/[\S]+/),
  }),
}), createUser);

app.use(requestLogger);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
