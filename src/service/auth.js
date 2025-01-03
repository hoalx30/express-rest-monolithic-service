const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const { failure } = require('../constant');
const { authMapper } = require('../mapper');
const { jwtProvider } = require('../auth');
const { authValidator } = require('../validator');
const userService = require('./user');
const badCredentialService = require('./bad-credential');

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TTL, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TTL } = process.env;

const newCredential = (user) => {
	const accessTokenId = uuidv4();
	const refreshTokenId = uuidv4();
	const accessToken = jwtProvider.sign(user, parseInt(ACCESS_TOKEN_TTL), ACCESS_TOKEN_SECRET, accessTokenId, refreshTokenId);
	const refreshToken = jwtProvider.sign(user, parseInt(REFRESH_TOKEN_TTL), REFRESH_TOKEN_SECRET, refreshTokenId, accessTokenId);
	return { accessToken, accessTokenIssuedAt: Date.now(), refreshToken, refreshTokenIssuedAt: Date.now() };
};

// FIXME: JWT Token not include scope in payload in signUp but has in SignIn
const signUp = async (request) => {
	try {
		await authValidator.whenSignUp(request);
		const creation = authMapper.asUserCreation(request);
		const user = await userService.save(creation);
		return newCredential(user);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		let causeBy = failure.UserExistedF;
		if (error.causeBy === failure.AlreadyExistedF) throw createError({ causeBy, detail: causeBy.message });
		if (error.causeBy) throw error;
		causeBy = failure.SignUpF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const signIn = async (request) => {
	try {
		await authValidator.whenSignIn(request);
		const user = await userService.findByUsername(request.username);
		const isAuthenticated = await bcrypt.compare(request.password, user.password);
		const causeBy = failure.BadCredentialF;
		if (!isAuthenticated) throw createError({ causeBy, detail: causeBy.message });
		return newCredential(user);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		let causeBy = failure.BadCredentialF;
		if (error.causeBy === failure.NotExistedF) throw createError({ causeBy, detail: causeBy.message });
		causeBy = failure.SignUpF;
		if (error) throw error;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const me = async (username) => {
	try {
		const queried = await userService.findByUsername(username);
		return authMapper.asUserResponse(queried);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		let causeBy = failure.NotExistedF;
		if (error.causeBy == failure.NotExistedF) throw createError({ causeBy, detail: causeBy.message });
		causeBy = failure.RetrieveProfileF;
		if (error.causeBy) throw error;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const signOut = async (badCredential) => {
	try {
		const saved = await badCredentialService.save(badCredential);
		return saved.id;
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error.causeBy) throw error;
		const causeBy = failure.SignOutF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

const refresh = async (badCredential, referId, refreshToken) => {
	try {
		const claims = await jwtProvider.verify(refreshToken, REFRESH_TOKEN_SECRET);
		// @ts-ignore
		const refreshTokenId = claims.jti;
		const causeBy = failure.TokenNotSuitableF;
		if (referId !== refreshTokenId) throw createError({ causeBy, detail: causeBy.message });
		await badCredentialService.save(badCredential);
		const user = await userService.findById(badCredential.userId);
		return newCredential(user);
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		if (error) throw error;
		const causeBy = failure.RefreshTokenF;
		throw createError({ causeBy, detail: causeBy.message });
	}
};

module.exports = { signUp, signIn, me, signOut, refresh };
