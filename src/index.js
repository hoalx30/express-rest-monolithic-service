require('dotenv').config();

const {
	express: { app },
} = require('./context');
const appCfg = require('./config');

const main = async () => {
	const PORT = process.env.PORT || 8000;
	await appCfg.dbConfig();
	appCfg.middlewareConfig();
	appCfg.parseBodyConfig();
	appCfg.passportConfig();
	appCfg.routeConfig();
	appCfg.swaggerConfig();
	appCfg.recoveryConfig();
	app.listen(PORT);
};

main();
