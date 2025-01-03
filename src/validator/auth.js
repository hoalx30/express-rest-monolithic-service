const Joi = require('joi');
const createError = require('http-errors');

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
	if (error) throw createError({ causeBy: global.BodyNotReadableF, detail: error.message.replaceAll('"', '') });
};

module.exports = { whenSignIn, whenSignUp };
