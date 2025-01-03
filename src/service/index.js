const privilegeService = require('./privilege');
const roleService = require('./role');
const userService = require('./user');
const deviceService = require('./device');
const profileService = require('./profile');
const badCredentialService = require('./bad-credential');

module.exports = { privilegeService, roleService, userService, deviceService, profileService, badCredentialService };
