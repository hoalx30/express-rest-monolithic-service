const { Op } = require('sequelize');

const { privilege } = require('../model');

const existByName = async (name) => (await privilege.count({ paranoid: true, where: { name } })) > 0;

const save = async (model) => await privilege.create(model);

const findById = async (id) => await privilege.findByPk(id);

const findAllById = async (ids) => await privilege.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	let { rows, count } = await privilege.findAndCountAll({ limit: size, offset, distinct: true });
	const paging = { nextCursor: undefined, page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllSeek = async ({ currentCursor, size }) => {
	let nextCursor;
	let { rows, count } = await privilege.findAndCountAll({ limit: size, where: { id: { [Op.gte]: currentCursor } }, distinct: true });
	if (count) nextCursor = (Math.trunc(currentCursor / size) + 1) * size + 1;
	const paging = { nextCursor, page: undefined, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await privilege.findAndCountAll({ limit: size, offset, where: { ...cond } });
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllBySeek = async ({ currentCursor, size, cond }) => {
	let nextCursor;
	const { rows, count } = await privilege.findAndCountAll({ limit: size, where: { ...cond, id: { [Op.gte]: currentCursor } } });
	if (count) nextCursor = (Math.trunc(currentCursor / size) + 1) * size + 1;
	const paging = { nextCursor, page: undefined, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await privilege.findAndCountAll({ limit: size, offset, where: { deletedAt: { [Op.not]: null } }, paranoid: false });
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const update = async (id, update) => await privilege.update(update, { where: { id }, individualHooks: true });

const remove = async (id) => await privilege.destroy({ where: { id }, individualHooks: true });

module.exports = {
	existByName,
	save,
	findById,
	findAllById,
	findAll,
	findAllSeek,
	findAllBy,
	findAllBySeek,
	findAllArchived,
	update,
	remove,
};
