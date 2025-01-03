const privilegeRepository = require('./privilege');
const roleRepository = require('./role');
const userRepository = require('./user');
const deviceRepository = require('./device');
const profileRepository = require('./profile');
const badCredentialRepository = require('./bad-credential');

module.exports = { privilegeRepository, roleRepository, userRepository, deviceRepository, profileRepository, badCredentialRepository };
