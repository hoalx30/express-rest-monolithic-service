const { Op } = require('sequelize');

const { role, privilege } = require('../model');

const existByName = async (name) => (await role.count({ paranoid: true, where: { name } })) > 0;

const save = async (model) => await role.create(model);

const findById = async (id) =>
	await role.findByPk(id, {
		include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
	});

const findAllById = async (ids) => await role.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await role.findAndCountAll({
		limit: size,
		offset,
		include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await role.findAndCountAll({
		limit: size,
		offset,
		where: { ...cond },
		include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await role.findAndCountAll({
		limit: size,
		offset,
		where: { deletedAt: { [Op.not]: null } },
		include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
		paranoid: false,
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const update = async (id, update) => await role.update(update, { where: { id }, individualHooks: true });

const remove = async (id) => await role.destroy({ where: { id }, individualHooks: true });

module.exports = {
	existByName,
	save,
	findById,
	findAllById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
