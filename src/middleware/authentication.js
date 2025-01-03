const passport = require('passport');
const createError = require('http-errors');

const { failure, global } = require('../constant');
const { badCredentialService } = require('../service');

const authenticate = async (req, res, next) => {
	try {
		const authorization = req.header('Authorization');
		const causeBy = failure.MissingAuthorizationF;
		if (!authorization) throw createError({ causeBy, detail: causeBy.message });
		const accessToken = authorization.replace('Bearer ', '');
		const claims = await badCredentialService.ensureNotBadCredential(accessToken);
		// @ts-ignore
		// prettier-ignore
		req.user = { username: claims.sub, userId: claims.userId, referId: claims.referId, sessionId: claims.jti, sessionExpiredAt: claims.exp, scope: claims.scope};
		next();
	} catch (error) {
		console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
		next(error);
	}
};

/**
const authenticated = async (req, res, next) => {
	await passport.authenticate('jwt', { session: false }, async (err, payload, info) => {
		try {
			let causeBy = failure.TokenExpiredF;
			if (info?.name === 'TokenExpiredError') return next(createError({ causeBy, detail: causeBy.message }));
			causeBy = global.UnauthorizedF;
			if (info) return next(createError({ causeBy, detail: causeBy.message }));
			const accessToken = req.header('Authorization').replace('Bearer ', '');
			await badCredentialService.ensureNotBadCredential(accessToken);
			const { sub, jti, exp, ...user } = payload;
			req.user = { ...user, username: sub, sessionId: jti, sessionExpiredAt: exp };
			next();
		} catch (error) {
			console.log(`Error on Service: ${error?.causeBy?.message || error.message}`);
			if (error) return next(error);
			const causeBy = global.UnauthorizedF;
			next(createError({ causeBy, detail: causeBy.message }));
		}
	})(req, res, next);
};
*/

module.exports = { authenticate };
