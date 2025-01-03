const createError = require('http-errors');

const { param, query, validationResult } = require('express-validator');

const { global } = require('../constant');

const idRule = () => param('id').notEmpty().withMessage('id is required').isInt().withMessage('id must be a integer number');

const pagingRule = () => [
	query('page').notEmpty().withMessage('page is required').isInt({ min: 1 }).withMessage('page must greater than 0'),
	query('size').notEmpty().withMessage('size is required').isInt({ min: 5, max: 50 }).withMessage('size must between 5 and 50'),
];

const validated = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	// prettier-ignore
	// @ts-ignore
	const message = errors.array().at(0).msg;
	const causeBy = global.PathNotReadableF;
	throw createError({ causeBy, detail: message });
};

module.exports = { validated, idRule, pagingRule };
