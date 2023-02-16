/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
}

function getUser(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        return Promise.reject(new NotFoundError('Такого пользователя не существует'));
      }
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  console.log('object');
  User.findById(req.user._id)
    .then((user) => {
      // const { cookie } = req.headers;
      // if (!cookie || !cookie.startsWith('jwt=')) {
      //   return next(new UnauthorizedError('Необходима авторизация'));
      // }

      // const token = cookie.replace('jwt=', '');

      if (user) {
        res.status(200).send({ data: user });
        // const {
        //   _id, name, about, avatar, email,
        // } = user;
        // // const currentUser = user;
        // // currentUser.token = token;
        // res.status(200).send({
        //   data: {
        //     _id, name, about, avatar, email, token,
        //   },
        // });
      } else {
        return Promise.reject(new NotFoundError('Такого пользователя не существует'));
      }
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email,
      },
    }))
    .catch(next);
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        return Promise.reject(new NotFoundError('Такого пользователя не существует'));
      }
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  if (req.body.avatar) {
    User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
      new: true, runValidators: true,
    })
      .then((user) => {
        if (user) {
          res.status(200).send({ data: user });
        } else {
          return Promise.reject(new NotFoundError('Такого пользователя не существует'));
        }
      })
      .catch(next);
  } else {
    next(new BadRequestError('Проверьте правильность введенных данных'));
  }
}

function login(req, res, next) {
  let enteringUser;

  console.log(req.headers);
  console.log(req);
  console.log(req.cookies);

  User.findOne({ email: req.body.email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      enteringUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      const { JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: enteringUser._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).status(200).send({
        _id: enteringUser._id,
        consoleLog: {
          a: req.headers, b: req, c: req.cookies,
        },
      });
    })
    .catch(next);
}

module.exports = {
  getUsers, createUser, getUser, getCurrentUser, updateProfile, updateAvatar, login,
};
