const express = require('express');
const route = express.Router();

const { authController } = require('../controller');
const {
	authentication: { authenticate },
} = require('../middleware');

route.post('/sign-up', authController.signUp);
route.post('/sign-in', authController.signIn);
route.get('/me', authenticate, authController.me);
route.post('/sign-out', authenticate, authController.signOut);
route.post('/refresh', authenticate, authController.refresh);

module.exports = route;
