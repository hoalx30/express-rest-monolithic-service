const { Op } = require('sequelize');

const { user, role, privilege } = require('../model');

const existByUsername = async (username) => (await user.count({ paranoid: true, where: { username } })) > 0;

const save = async (model) => await user.create(model);

const findById = async (id) =>
	await user.findByPk(id, {
		include: {
			model: role,
			// @ts-ignore
			include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
	});

const findByUsername = async (username) =>
	await user.findOne({
		where: { username },
		include: {
			model: role,
			// @ts-ignore
			include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
	});

const findAllById = async (ids) => await user.findAll({ where: { id: { [Op.in]: ids } } });

const findAll = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await user.findAndCountAll({
		limit: size,
		offset,
		include: {
			model: role,
			// @ts-ignore
			include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllSeek = async ({ currentCursor, size }) => {
	let nextCursor;
	const { rows, count } = await user.findAndCountAll({
		limit: size,
		where: { id: { [Op.gte]: currentCursor } },
		include: {
			model: role,
			// @ts-ignore
			include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		distinct: true,
	});
	if (count) nextCursor = (Math.trunc(currentCursor / size) + 1) * size + 1;
	const paging = { nextCursor, page: undefined, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllBy = async ({ page, size, cond }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await user.findAndCountAll({
		limit: size,
		offset,
		where: { ...cond },
		include: {
			model: role,
			// @ts-ignore
			include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllBySeek = async ({ currentCursor, size, cond }) => {
	let nextCursor;
	const { rows, count } = await user.findAndCountAll({
		limit: size,
		where: { ...cond, id: { [Op.gte]: currentCursor } },
		include: {
			model: role,
			// @ts-ignore
			include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		distinct: true,
	});
	if (count) nextCursor = (Math.trunc(currentCursor / size) + 1) * size + 1;
	const paging = { nextCursor, page: undefined, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const findAllArchived = async ({ page, size }) => {
	const offset = (page - 1) * size;
	const { rows, count } = await user.findAndCountAll({
		limit: size,
		offset,
		where: { deletedAt: { [Op.not]: null } },
		include: {
			model: role,
			// @ts-ignore
			include: { model: privilege, through: { attributes: [] }, attributes: ['name', 'description'], as: 'privileges' },
			through: { attributes: [] },
			attributes: ['name', 'description'],
			as: 'roles',
		},
		paranoid: false,
		distinct: true,
	});
	const paging = { page, pages: Math.trunc(count / size) + 1, records: count };
	return { rows, paging };
};

const update = async (id, update) => await user.update(update, { where: { id }, individualHooks: true });

const remove = async (id) => await user.destroy({ where: { id }, individualHooks: true });

module.exports = {
	existByUsername,
	save,
	findById,
	findByUsername,
	findAllById,
	findAll,
	findAllSeek,
	findAllBy,
	findAllBySeek,
	findAllArchived,
	update,
	remove,
};
