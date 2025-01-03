const newResponse = (code, httpCode, message, payload) => ({ timestamp: Date.now(), code, httpCode, message, payload });

const newResponsePaging = (code, httpCode, message, payload, paging) => ({ timestamp: Date.now(), code, httpCode, message, payload, paging });

const doSuccess = (res, success, payload) => {
	res.status(success.httpCode);
	res.send(newResponse(success.code, success.httpCode, success.message, payload));
};

const doSuccessPaging = (res, success, payload, paging) => {
	res.status(success.httpCode);
	res.send(newResponsePaging(success.code, success.httpCode, success.message, payload, paging));
};

const doError = (res, exception) => {
	const causeBy = exception.causeBy;
	res.status(causeBy.httpCode);
	res.send(newResponse(causeBy.code, causeBy.httpCode, exception.detail));
};

const doErrorWith = (res, causeBy) => {
	res.status(causeBy.httpCode);
	res.send(newResponse(causeBy.code, causeBy.httpCode, causeBy.message));
};

module.exports = { doSuccess, doSuccessPaging, doError, doErrorWith };
