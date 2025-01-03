const createError = require('http-errors');

const { failure, global } = require('../constant');

const getScope = (req) => {
	const { scope } = req.user;
	const causeBy = failure.MissingAuthorizationF;
	if (!scope) throw createError({ causeBy, detail: causeBy.message });
	return scope;
};

const hasAuthority = (authority) => (req, res, next) => {
	const scope = getScope(req);
	const isGranted = scope.includes(authority);
	const causeBy = global.ForbiddenF;
	if (!isGranted) throw createError({ causeBy, detail: causeBy.message });
	next();
};

const hasAnyAuthority =
	(...authorities) =>
	(req, res, next) => {
		let isGranted = false;
		const scope = getScope(req);
		authorities.forEach((authority) => {
			if (scope.includes(authority)) isGranted = true;
		});
		const causeBy = global.ForbiddenF;
		if (!isGranted) throw createError({ causeBy, detail: causeBy.message });
		next();
	};

module.exports = { hasAuthority, hasAnyAuthority };
