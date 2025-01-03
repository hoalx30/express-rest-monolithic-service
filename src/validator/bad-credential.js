const createError = require('http-errors');
const Joi = require('joi');

const { global } = require('../constant');

const badCredential = Joi.object({
	accessTokenId: Joi.string().required(),
	accessTokenExpiredAt: Joi.number().required(),
	userId: Joi.number().required(),
});

const validate = (schema) => {
	const { error } = badCredential.validate(schema);
	if (error) throw createError({ causeBy: global.QueryNotReadableF, detail: error.message.replaceAll('"', '') });
};

module.exports = { validate };
