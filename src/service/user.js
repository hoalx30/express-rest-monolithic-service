const createError = require('http-errors');

const { failure } = require('../constant');
const { userValidator } = require('../validator');
const { userRepository, roleRepository } = require('../repository');
const { userMapper } = require('../mapper');

const ensureNotExistedByUsername = async (username) => {
	const causeBy = failure.AlreadyExistedF;
	if (await userRepository.existByUsername(username)) throw createError({ causeBy, detail: causeBy.message });
};

const ensureExistedById = async (id) => {
	const old = await userRepository.findById(id);
	const causeBy = failure.NotExistedF;
	if (!old) throw createError({ causeBy, detail: causeBy.message });
	return old;
};

const ensureOwningExistedByIds = async (ids) => {
	const owning = await roleRepository.findAllById(ids);
	const causeBy = failure.OwningSideNotExistedF;
	if (!owning.length) throw createError({ causeBy, detail: causeBy.message });
	return owning;
};

const save = async (creation) => {
	try {
		userValidator.whenCreate(creation);
		await ensureNotExistedByUsername(creation.username);
		const owning = await ensureOwningExistedByIds(creation.roleIds);
		const saved = await userRepository.save(creation);
		// @ts-ignore
		saved.setRoles(owning);
		return userMapper.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.SaveF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findById = async (id) => {
	try {
		const queried = await userRepository.findById(id);
		const causeBy = failure.FindByIdNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		return userMapper.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindByIdF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findByUsername = async (username) => {
	try {
		const queried = await userRepository.findByUsername(username);
		const causeBy = failure.NotExistedF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		return userMapper.asResponse(queried);
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
		if (!currentCursor) ({ rows: queried, paging: pageable } = await userRepository.findAll({ page, size }));
		else ({ rows: queried, paging: pageable } = await userRepository.findAllSeek({ currentCursor, size }));
		const causeBy = failure.FindAllNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = userMapper.asListResponse(queried);
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
		if (!currentCursor) ({ rows: queried, paging: pageable } = await userRepository.findAllBy({ page, size, cond }));
		else ({ rows: queried, paging: pageable } = await userRepository.findAllBySeek({ currentCursor, size, cond }));
		const causeBy = failure.FindAllByNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = userMapper.asListResponse(queried);
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
		const { rows: queried, paging } = await userRepository.findAllArchived({ page, size });
		const causeBy = failure.FindArchivedNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = userMapper.asListResponse(queried);
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
		userValidator.whenUpdate(update);
		const old = await ensureExistedById(id);
		await userRepository.update(id, update);
		return userMapper.asResponse(old);
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
		// @ts-ignore
		old.setRoles([]);
		await userRepository.remove(id);
		return userMapper.asResponse(old);
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
	findByUsername,
	findAll,
	findAllBy,
	findAllArchived,
	update,
	remove,
};
