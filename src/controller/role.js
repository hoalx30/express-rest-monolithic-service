const _ = require('lodash');

const { roleService } = require('../service');
const { success } = require('../constant');
const response = require('../response');

const save = async (req, res, next) => {
	try {
		const { name, description, privilegeIds } = req.body;
		const creation = { name, description, privilegeIds };
		const saved = await roleService.save(creation);
		response.doSuccess(res, success.SaveS, saved);
	} catch (error) {
		next(error);
	}
};

const findById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const queried = await roleService.findById(+id);
		response.doSuccess(res, success.FindByIdS, queried);
	} catch (error) {
		next(error);
	}
};

const findAll = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await roleService.findAll({ page: +page, size: +size });
		response.doSuccessPaging(res, success.FindAllS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllBy = async (req, res, next) => {
	try {
		const { page, size, name } = req.query;
		const cond = _.pickBy({ name }, (v) => !_.isNil(v));
		const { response: queried, paging } = await roleService.findAllBy({ page: +page, size: +size, cond });
		response.doSuccessPaging(res, success.FindAllByS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllArchived = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await roleService.findAllArchived({ page: +page, size: +size });
		response.doSuccessPaging(res, success.FindArchivedS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;
		const update = { name, description };
		const old = await roleService.update(+id, update);
		response.doSuccess(res, success.UpdateS, old);
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const old = await roleService.remove(+id);
		response.doSuccess(res, success.DeleteS, old);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	save,
	findById,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
