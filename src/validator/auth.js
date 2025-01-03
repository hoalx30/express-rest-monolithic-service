const Joi = require('joi');
const createError = require('http-errors');

const { winston: logger } = require('../context');
const { global } = require('../constant');

const signUp = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	roleIds: Joi.array().items(Joi.number()).required(),
});

const signIn = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

const whenSignUp = async (model) => {
	const { error } = await signUp.validate(model);
	if (error) throw createError({ causeBy: global.BodyNotReadableF, detail: error.message.replaceAll('"', '') });
};

const whenSignIn = async (model) => {
	const { error } = await signIn.validate(model);
	if (error) {
		logger.error({ message: `validate username, password failed: ${model?.username}`, error: error.message.replaceAll('"', ''), traceId: 'uuid' });
		throw createError({ causeBy: global.BodyNotReadableF, detail: error.message.replaceAll('"', '') });
	}
	logger.debug({ message: `validate username, password success: ${model?.username}`, error: undefined, traceId: 'uuid' });
};

module.exports = { whenSignIn, whenSignUp };
