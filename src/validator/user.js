const createError = require('http-errors');
const Joi = require('joi');

const { global } = require('../constant');

const creation = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	roleIds: Joi.array().items(Joi.number()).required(),
});

const update = Joi.object({
	password: Joi.string(),
});

const whenCreate = (model) => {
	const { error } = creation.validate(model);
	if (error) throw createError({ causeBy: global.BodyNotReadableF, detail: error.message.replaceAll('"', '') });
};

const whenUpdate = (model) => {
	const { error } = update.validate(model);
	if (error) throw createError({ causeBy: global.BodyNotReadableF, detail: error.message.replaceAll('"', '') });
};

module.exports = { whenCreate, whenUpdate };
