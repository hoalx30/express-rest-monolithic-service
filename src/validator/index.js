const privilegeValidator = require('./privilege');
const roleValidator = require('./role');
const userValidator = require('./user');
const profileValidator = require('./profile');
const deviceValidator = require('./device');
const badCredentialValidator = require('./bad-credential');
const authValidator = require('./auth');

module.exports = { privilegeValidator, roleValidator, userValidator, profileValidator, deviceValidator, badCredentialValidator, authValidator };
