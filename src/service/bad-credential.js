const createError = require('http-errors');

const { failure } = require('../constant');
const { badCredentialRepository } = require('../repository');
const { badCredentialMapper } = require('../mapper');
const { jwtProvider } = require('../auth');

const ensureNotBadCredential = async (token) => {
	try {
		const claims = jwtProvider.verify(token, process.env.ACCESS_TOKEN_SECRET);
		// @ts-ignore
		const isBadCredential = await badCredentialRepository.existsByAccessTokenId(claims.jti);
		const causeBy = failure.TokenBlockedF;
		if (isBadCredential) throw createError({ causeBy, detail: causeBy.message });
		return claims;
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.EnsureNotBadCredentialF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const save = async (creation) => {
	try {
		const saved = await badCredentialRepository.save(creation);
		return badCredentialMapper.asResponse(saved);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.SaveF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

module.exports = { save, ensureNotBadCredential };
