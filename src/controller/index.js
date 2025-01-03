const privilegeController = require('./privilege');
const roleController = require('./role');
const userController = require('./user');
const deviceController = require('./device');
const profileController = require('./profile');
const authController = require('./auth');

module.exports = {
	privilegeController,
	roleController,
	userController,
	deviceController,
	profileController,
	authController,
};
