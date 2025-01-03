const { Op } = require('sequelize');

const { profile, user } = require('../model');

const save = async (model) => await profile.create(model);

const findById = async (id) => await profile.findByPk(id, { include: { model: user, attributes: ['username'], as: 'user' } });

const findByUserId = async (userId) =>
	await profile.findOne({
		where: { userId },
		include: { model: user, attributes: ['username'], as: 'user' },
	});

const findAllById = async (ids) => await profile.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await profile.findAndCountAll({
		limit: size,
		offset,
		include: { model: user, attributes: ['username'], as: 'user' },
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await profile.findAndCountAll({
		limit: size,
		offset,
		where: { ...cond },
		include: { model: user, attributes: ['username'], as: 'user' },
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await profile.findAndCountAll({
		limit: size,
		offset,
		where: { deletedAt: { [Op.not]: null } },
		include: { model: user, attributes: ['username'], as: 'user' },
		paranoid: false,
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const update = async (id, update) => await profile.update(update, { where: { id } });

const remove = async (id) => await profile.destroy({ where: { id } });

module.exports = {
	save,
	findById,
	findByUserId,
	findAllById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
