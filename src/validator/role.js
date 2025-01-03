const createError = require('http-errors');
const Joi = require('joi');

const { global } = require('../constant');

const creation = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	privilegeIds: Joi.array().items(Joi.number()).required(),
});

const update = Joi.object({
	name: Joi.string(),
	description: Joi.string(),
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
