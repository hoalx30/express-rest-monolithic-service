const { StatusCodes } = require('http-status-codes');

module.exports = Object.freeze({
	UncategorizedF: { code: 0, message: 'uncategorized exception, service can not response.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	NotFoundF: { code: 1, message: 'apis resource not found.', httpCode: StatusCodes.NOT_FOUND },
	MethodNotAllowed: { code: 2, message: 'method not allowed on this endpoint.', httpCode: StatusCodes.METHOD_NOT_ALLOWED },
	BodyNotReadableF: { code: 3, message: 'missing or request body is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	HeaderNotReadableF: { code: 4, message: 'missing or request header is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	QueryNotReadableF: { code: 5, message: 'missing or query string is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	PathNotReadableF: { code: 6, message: 'missing or path variable is not readable.', httpCode: StatusCodes.BAD_REQUEST },
	UnauthorizedF: { code: 7, message: 'unauthorized: your identity not verified.', httpCode: StatusCodes.UNAUTHORIZED },
	ForbiddenF: { code: 8, message: 'forbidden: do not has right authority, do not f*ck with cat.', httpCode: StatusCodes.FORBIDDEN },
});
