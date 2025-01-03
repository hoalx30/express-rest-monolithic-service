const createError = require('http-errors');

const { failure } = require('../constant');
const { profileValidator } = require('../validator');
const { profileRepository, userRepository } = require('../repository');
const { profileMapper } = require('../mapper');

const ensureExistedById = async (id) => {
	const old = await profileRepository.findById(id);
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

const ensureOwningAvailableById = async (owningId) => {
	const owning = await ensureOwningExistedById(owningId);
	const owningExisted = await profileRepository.findByUserId(owningId);
	const causeBy = failure.OwningSideNotAvailableF;
	if (owningExisted) throw createError({ causeBy, detail: causeBy.message });
	return owning;
};

const save = async (creation) => {
	try {
		profileValidator.whenCreate(creation);
		const owning = await ensureOwningAvailableById(creation.userId);
		const saved = await profileRepository.save(creation);
		// @ts-ignore
		saved.setUser(owning);
		return profileMapper.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.SaveF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findById = async (id) => {
	try {
		const queried = await profileRepository.findById(id);
		const causeBy = failure.FindByIdNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		return profileMapper.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindByIdF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAll = async ({ page, size }) => {
	try {
		const { rows: queried, paging } = await profileRepository.findAll({ page, size });
		const causeBy = failure.FindAllNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = profileMapper.asListResponse(queried);
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
		const { rows: queried, paging } = await profileRepository.findAllBy({ page, size, cond });
		const causeBy = failure.FindAllByNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = profileMapper.asListResponse(queried);
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
		const { rows: queried, paging } = await profileRepository.findAllArchived({ page, size });
		const causeBy = failure.FindArchivedNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = profileMapper.asListResponse(queried);
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
		profileValidator.whenUpdate(update);
		const old = await ensureExistedById(id);
		await profileRepository.update(id, update);
		return profileMapper.asResponse(old);
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
		await profileRepository.remove(id);
		return profileMapper.asResponse(old);
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
