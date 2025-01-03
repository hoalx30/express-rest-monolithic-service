const _ = require('lodash');

const { userService } = require('../service');
const { success } = require('../constant');
const response = require('../response');

const save = async (req, res, next) => {
	try {
		const { username, password, roleIds } = req.body;
		const creation = { username, password, roleIds };
		const saved = await userService.save(creation);
		response.doSuccess(res, success.SaveS, saved);
	} catch (error) {
		next(error);
	}
};

const findById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const queried = await userService.findById(+id);
		response.doSuccess(res, success.FindByIdS, queried);
	} catch (error) {
		next(error);
	}
};

const findAll = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await userService.findAll({ page: +page, size: +size });
		response.doSuccessPaging(res, success.FindAllS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllBy = async (req, res, next) => {
	try {
		const { page, size, username } = req.query;
		const cond = _.pickBy({ username }, (v) => !_.isNil(v));
		const { response: queried, paging } = await userService.findAllBy({ page: +page, size: +size, cond });
		response.doSuccessPaging(res, success.FindAllByS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllArchived = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await userService.findAllArchived({ page: +page, size: +size });
		response.doSuccessPaging(res, success.FindArchivedS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { password } = req.body;
		const update = { password };
		const old = await userService.update(+id, update);
		response.doSuccess(res, success.UpdateS, old);
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const old = await userService.remove(+id);
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
