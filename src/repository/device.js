const { Op } = require('sequelize');

const { device, user } = require('../model');

const save = async (model) => await device.create(model);

const findById = async (id) => await device.findByPk(id, { include: { model: user, attributes: ['username'], as: 'user' } });

const findAllById = async (ids) => await device.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await device.findAndCountAll({
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
	const { rows, count } = await device.findAndCountAll({
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
	const { rows, count } = await device.findAndCountAll({
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

const update = async (id, update) => await device.update(update, { where: { id }, individualHooks: true });

const remove = async (id) => await device.destroy({ where: { id }, individualHooks: true });

module.exports = {
	save,
	findById,
	findAllById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
