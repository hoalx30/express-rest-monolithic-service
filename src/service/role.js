const createError = require('http-errors');

const { failure } = require('../constant');
const { roleValidator } = require('../validator');
const { roleRepository, privilegeRepository } = require('../repository');
const { roleMapper } = require('../mapper');

const ensureNotExistedByName = async (name) => {
	const causeBy = failure.AlreadyExistedF;
	if (await roleRepository.existByName(name)) throw createError({ causeBy, detail: causeBy.message });
};

const ensureExistedById = async (id) => {
	const old = await roleRepository.findById(id);
	const causeBy = failure.NotExistedF;
	if (!old) throw createError({ causeBy, detail: causeBy.message });
	return old;
};

const ensureOwningExistedByIds = async (ids) => {
	const owning = await privilegeRepository.findAllById(ids);
	const causeBy = failure.OwningSideNotExistedF;
	if (!owning.length) throw createError({ causeBy, detail: causeBy.message });
	return owning;
};

const save = async (creation) => {
	try {
		roleValidator.whenCreate(creation);
		await ensureNotExistedByName(creation.name);
		const owning = await ensureOwningExistedByIds(creation.privilegeIds);
		const saved = await roleRepository.save(creation);
		// @ts-ignore
		saved.setPrivileges(owning);
		return roleMapper.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.SaveF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findById = async (id) => {
	try {
		const queried = await roleRepository.findById(id);
		const causeBy = failure.FindByIdNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		return roleMapper.asResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.FindByIdF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const findAll = async ({ page, size }) => {
	try {
		const { rows: queried, paging } = await roleRepository.findAll({ page, size });
		const causeBy = failure.FindAllNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = roleMapper.asListResponse(queried);
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
		const { rows: queried, paging } = await roleRepository.findAllBy({ page, size, cond });
		const causeBy = failure.FindAllByNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = roleMapper.asListResponse(queried);
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
		const { rows: queried, paging } = await roleRepository.findAllArchived({ page, size });
		const causeBy = failure.FindArchivedNoContentF;
		if (!queried) throw createError({ causeBy, detail: causeBy.message });
		const response = roleMapper.asListResponse(queried);
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
		roleValidator.whenUpdate(update);
		const old = await ensureExistedById(id);
		await roleRepository.update(id, update);
		return roleMapper.asResponse(old);
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
		old.setPrivileges([]);
		await roleRepository.remove(id);
		return roleMapper.asResponse(old);
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
