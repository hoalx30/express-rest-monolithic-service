const path = require('path');

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const infoLogDirPath = path.join(__dirname, '../../', 'log', 'info');
const errorLogDirPath = path.join(__dirname, '../../', 'log', 'error');

const logger = winston.createLogger({
	format: winston.format.printf(({ level, message, error, traceId }) => {
		return `${Date.now()} - [${level}]: ${message} - ${error} - ${traceId}`;
	}),
	transports: [
		new winston.transports.Console({ level: 'error' }),
		new DailyRotateFile({
			dirname: infoLogDirPath,
			datePattern: 'MM-DD-YYYY',
			extension: '.log',
			zippedArchive: true,
			filename: '%DATE%.log',
			level: 'debug',
		}),
		new DailyRotateFile({
			dirname: errorLogDirPath,
			datePattern: 'MM-DD-YYYY',
			extension: '.log',
			zippedArchive: true,
			filename: '%DATE%.log',
			level: 'error',
		}),
	],
});

module.exports = logger;
