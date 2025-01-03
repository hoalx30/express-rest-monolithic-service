const express = require('express');
const route = express.Router();

const { authController } = require('../controller');
const {
	authentication: { authenticated },
} = require('../middleware');

route.post('/sign-up', authController.signUp);
route.post('/sign-in', authController.signIn);
route.get('/me', authenticated, authController.me);
route.post('/sign-out', authenticated, authController.signOut);
route.post('/refresh', authenticated, authController.refresh);

module.exports = route;
