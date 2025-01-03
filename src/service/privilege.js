const createError = require('http-errors');

const { failure } = require('../constant');
const { privilegeValidator } = require('../validator');
const { privilegeRepository } = require('../repository');
const { privilegeMapper } = require('../mapper');

const { SEEK_PAGING_BOUNDARY } = process.env;

const ensureNotExistedByName = async (name) => {
	const causeBy = failure.AlreadyExistedF;
	if (await privilegeRepository.existByName(name)) throw createError({ causeBy, detail: causeBy.message });
};

const ensureExistedById = async (id) => {
	const old = await privilegeRepository.findById(id);
	const causeBy = failure.NotExistedF;
	if (!old) throw createError({ causeBy, detail: causeBy.message });
	return old;
};

const save = async (creation) => {
	try {
		privilegeValidator.whenCreate(creation);
		await ensureNotExistedByName(creation.name);
		const saved = await privilegeRepository.save(creation);
		return privilegeMapper.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.SaveF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findById = async (id) => {
	try {
		const queried = await privilegeRepository.findById(id);
		if (!queried) throw createError({ causeBy: failure.FindByIdNoContentF });
		return privilegeMapper.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindByIdF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAll = async ({ page, size, nextCursor: currentCursor }) => {
	try {
		let queried, pageable;
		if (!currentCursor) ({ rows: queried, paging: pageable } = await privilegeRepository.findAll({ page, size }));
		else ({ rows: queried, paging: pageable } = await privilegeRepository.findAllSeek({ currentCursor, size }));
		const causeBy = failure.FindAllNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = privilegeMapper.asListResponse(queried);
		return { response, pageable };
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindAllF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAllBy = async ({ page, size, cond, nextCursor: currentCursor }) => {
	try {
		let queried, pageable;
		if (currentCursor) ({ rows: queried, paging: pageable } = await privilegeRepository.findAllBySeek({ currentCursor, size, cond }));
		else ({ rows: queried, paging: pageable } = await privilegeRepository.findAllBy({ page, size, cond }));
		const causeBy = failure.FindAllByNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = privilegeMapper.asListResponse(queried);
		return { response, pageable };
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindAllByF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAllArchived = async ({ page, size }) => {
	try {
		const { rows: queried, paging } = await privilegeRepository.findAllArchived({ page, size });
		const causeBy = failure.FindArchivedF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = privilegeMapper.asListResponse(queried);
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
		privilegeValidator.whenUpdate(update);
		const old = await ensureExistedById(id);
		await privilegeRepository.update(id, update);
		return privilegeMapper.asResponse(old);
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
		await privilegeRepository.remove(id);
		return privilegeMapper.asResponse(old);
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
