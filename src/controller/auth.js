const createError = require('http-errors');

const { success, failure } = require('../constant');
const { authService } = require('../service');
const response = require('../response');

const signUp = async (req, res, next) => {
	try {
		const { username, password, roleIds } = req.body;
		const request = { username, password, roleIds };
		const credential = await authService.signUp(request);
		response.doSuccess(res, success.SignUpS, credential);
	} catch (error) {
		next(error);
	}
};

const signIn = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const request = { username, password };
		const credential = await authService.signIn(request);
		response.doSuccess(res, success.SignInS, credential);
	} catch (error) {
		next(error);
	}
};

const me = async (req, res, next) => {
	try {
		const { username } = req.user;
		const user = await authService.me(username);
		response.doSuccess(res, success.RetrieveProfileS, user);
	} catch (error) {
		next(error);
	}
};

const signOut = async (req, res, next) => {
	try {
		const { sessionId: accessTokenId, sessionExpiredAt: accessTokenExpiredAt, userId } = req.user;
		const badCredential = { accessTokenId, accessTokenExpiredAt, userId };
		const sessionId = await authService.signOut(badCredential);
		response.doSuccess(res, success.SignOutS, sessionId);
	} catch (error) {
		next(error);
	}
};

const refresh = async (req, res, next) => {
	try {
		const xRefreshToken = req.header('X-REFRESH-TOKEN');
		const causeBy = failure.MissingAuthorizationF;
		if (!xRefreshToken) throw createError({ causeBy, detail: causeBy.message });
		const refreshToken = xRefreshToken.replace('Bearer ', '');
		const { sessionId: accessTokenId, sessionExpiredAt: accessTokenExpiredAt, userId, referId } = req.user;
		const badCredential = { accessTokenId, accessTokenExpiredAt, userId };
		const credential = await authService.refresh(badCredential, referId, refreshToken);
		response.doSuccess(res, success.RefreshTokenS, credential);
	} catch (error) {
		next(error);
	}
};

module.exports = { signUp, signIn, me, signOut, refresh };
