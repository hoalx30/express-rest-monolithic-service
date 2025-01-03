const user = require('./user');
const role = require('./role');
const privilege = require('./privilege');
const device = require('./device');
const profile = require('./profile');
const badCredential = require('./bad-credential');
const { doAssociation, doHooks } = require('./setup');

doAssociation(privilege, role, user, device, profile);
doHooks(user);

module.exports = { user, role, privilege, device, badCredential, profile };
