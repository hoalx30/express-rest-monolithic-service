const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const {
	sequelize: { sequelize },
	express: { app },
} = require('./context');
const { global } = require('./constant');
const model = require('./model');
const response = require('./response');
const { routeSetup } = require('./router');
const passportProvider = require('./passport');

const DBConfigF = 'can not established connection to database via sequelize.';

const dbConfig = async () => {
	try {
		await sequelize.authenticate();
		/**
		 * await sequelize.sync({ alter: true });
		 */
	} catch (error) {
		console.log(`Error on Configuration: ${error.message}`);
		throw new Error(DBConfigF);
	}
};

const middlewareConfig = () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(compression());
	// @ts-ignore
	app.use(helmet());
	app.use(morgan('dev'));
};

const passportConfig = () => passportProvider.jwtStrategy();

const routeConfig = () => routeSetup.established(app);

const parseBodyConfig = () => {
	app.use((err, req, res, next) => {
		if (err.status == 400) {
			response.doErrorWith(res, global.BodyNotReadableF);
			return;
		}
		next(err);
	});
};

const recoveryConfig = () => {
	app.use((req, res, next) => {
		response.doErrorWith(res, global.NotFoundF);
	});
	app.use((err, req, res, next) => {
		if (err.causeBy) {
			response.doError(res, err);
			return;
		}
		console.log(`Error on Recovery: ${err.message}`);
		response.doErrorWith(res, global.UncategorizedF);
	});
};

module.exports = { dbConfig, parseBodyConfig, middlewareConfig, recoveryConfig, passportConfig, routeConfig };
