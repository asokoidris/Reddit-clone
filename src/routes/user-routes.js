const express = require('express');

const router = express.Router();

const UserController = require('../controller/user-controller');
const { validate } = require('../validation/validatorClass');
const {
  createUserSchema,
  loginUserSchema,
} = require('../validation/schema/user');

router.post('/signup', validate(createUserSchema), UserController.createUser);

router.post('/login', validate(loginUserSchema), UserController.login);

module.exports = router;
