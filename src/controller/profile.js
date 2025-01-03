const _ = require('lodash');

const { profileService } = require('../service');
const { success } = require('../constant');
const response = require('../response');

const save = async (req, res, next) => {
	try {
		const { fullName, userId } = req.body;
		const creation = { fullName, userId };
		const saved = await profileService.save(creation);
		response.doSuccess(res, success.SaveS, saved);
	} catch (error) {
		next(error);
	}
};

const findById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const queried = await profileService.findById(+id);
		response.doSuccess(res, success.FindByIdS, queried);
	} catch (error) {
		next(error);
	}
};

const findAll = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await profileService.findAll({ page: +page, size: +size });
		response.doSuccessPaging(res, success.FindAllS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllBy = async (req, res, next) => {
	try {
		const { page, size, fullName } = req.query;
		const cond = _.pickBy({ fullName }, (v) => !_.isNil(v));
		const { response: queried, paging } = await profileService.findAllBy({ page: +page, size: +size, cond });
		response.doSuccessPaging(res, success.FindAllByS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const findAllArchived = async (req, res, next) => {
	try {
		const { page, size } = req.query;
		const { response: queried, paging } = await profileService.findAllArchived({ page: +page, size: +size });
		response.doSuccessPaging(res, success.FindArchivedS, queried, paging);
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { fullName } = req.body;
		const update = { fullName };
		const old = await profileService.update(+id, update);
		response.doSuccess(res, success.UpdateS, old);
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const old = await profileService.remove(+id);
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
