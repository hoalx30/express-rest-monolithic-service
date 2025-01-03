const createError = require('http-errors');

const { failure } = require('../constant');
const { deviceValidator } = require('../validator');
const { deviceRepository, userRepository } = require('../repository');
const { deviceMapper } = require('../mapper');

const ensureExistedById = async (id) => {
	const old = await deviceRepository.findById(id);
	const causeBy = failure.NotExistedF;
	if (!old) throw createError({ causeBy, detail: causeBy.message });
	return old;
};

const ensureOwningExistedById = async (id) => {
	const owning = await userRepository.findById(id);
	const causeBy = failure.OwningSideNotExistedF;
	if (!owning) throw createError({ causeBy, detail: causeBy.message });
	return owning;
};

const save = async (creation) => {
	try {
		deviceValidator.whenCreate(creation);
		const owning = await ensureOwningExistedById(creation.userId);
		const saved = await deviceRepository.save(creation);
		// @ts-ignore
		saved.setUser(owning);
		return deviceMapper.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.SaveF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findById = async (id) => {
	try {
		const queried = await deviceRepository.findById(id);
		const causeBy = failure.FindByIdNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		return deviceMapper.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindByIdF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAll = async ({ page, size }) => {
	try {
		const { rows: queried, paging } = await deviceRepository.findAll({ page, size });
		const causeBy = failure.FindAllNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = deviceMapper.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindAllF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAllBy = async ({ page, size, cond }) => {
	try {
		const { rows: queried, paging } = await deviceRepository.findAllBy({ page, size, cond });
		const causeBy = failure.FindAllByNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = deviceMapper.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindAllByF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAllArchived = async ({ page, size }) => {
	try {
		const { rows: queried, paging } = await deviceRepository.findAllArchived({ page, size });
		const causeBy = failure.FindArchivedNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = deviceMapper.asListResponse(queried);
		return { response, paging };
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindArchivedF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const update = async (id, update) => {
	try {
		deviceValidator.whenUpdate(update);
		const old = await ensureExistedById(id);
		await deviceRepository.update(id, update);
		return deviceMapper.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.UpdateF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const remove = async (id) => {
	try {
		const old = await ensureExistedById(id);
		await deviceRepository.remove(id);
		return deviceMapper.asResponse(old);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.DeleteF;
		throw createError({ causeBy, detail: causeBy.message });
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
