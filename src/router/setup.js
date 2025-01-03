const privilegeRoute = require('./privilege');
const roleRoute = require('./role');
const userRoute = require('./user');
const deviceRoute = require('./device');
const statusRoute = require('./profile');
const authRoute = require('./auth');

const established = (app) => {
	// prettier-ignore
	app.use('/api/v1/privileges', privilegeRoute, /* #swagger.ignore = true */ );
	// prettier-ignore
	app.use('/api/v1/roles', roleRoute, /* #swagger.ignore = true */ );
	// prettier-ignore
	app.use('/api/v1/users', userRoute, /* #swagger.ignore = true */ );
	// prettier-ignore
	app.use('/api/v1/devices', deviceRoute, /* #swagger.ignore = true */ );
	// prettier-ignore
	app.use('/api/v1/profiles', statusRoute, /* #swagger.ignore = true */ );
	// prettier-ignore
	app.use('/api/v1/auth', authRoute, /* #swagger.ignore = true */ );
};
module.exports = { established };
