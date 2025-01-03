const { StatusCodes } = require('http-status-codes');

module.exports = Object.freeze({
	SaveF: { code: 200, message: 'can not save {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindByIdF: { code: 201, message: 'can not retrieve {resource} by id: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindByIdNoContentF: { code: 202, message: 'retrieve {resource} by id return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindByF: { code: 203, message: 'can not query {resource} by {criteria}.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindByNoContentF: { code: 204, message: 'retrieve {resource} by {criteria} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindAllByIdF: { code: 205, message: 'can not retrieve {resource} by id: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindAllByIdNoContentF: { code: 206, message: 'retrieve {resource} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindAllF: { code: 207, message: 'can not retrieve {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindAllNoContentF: { code: 208, message: 'retrieve {resource} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindAllByF: { code: 209, message: 'can not retrieve {resource} by criteria: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindAllByNoContentF: { code: 210, message: 'retrieve {resource} by {criteria} return no content.', httpCode: StatusCodes.NO_CONTENT },
	FindArchivedF: { code: 211, message: 'can not retrieve archived {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	FindArchivedNoContentF: { code: 212, message: 'retrieve archived {resource} return no content.', httpCode: StatusCodes.NO_CONTENT },
	UpdateF: { code: 213, message: 'can not update {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	DeleteF: { code: 214, message: 'can not remove {resource}: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },

	AlreadyExistedF: { code: 215, message: '{resource} already existed, {identity} must be unique.', httpCode: StatusCodes.BAD_REQUEST },
	NotExistedF: { code: 216, message: '{resource} does not existed.', httpCode: StatusCodes.NOT_MODIFIED },
	OwningSideNotExistedF: { code: 217, message: 'can not save {resource}: {owning side} not exists.', httpCode: StatusCodes.BAD_REQUEST },
	OwningSideNotAvailableF: { code: 218, message: 'can not save {resource}: {owning side} not available.', httpCode: StatusCodes.BAD_REQUEST },

	SignTokenF: { code: 219, message: 'can not sign token: ill legal claims or encrypt algorithm.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	ParseTokenF: { code: 220, message: 'can not parse token: ill legal token or encrypt algorithm.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	IllLegalTokenF: { code: 221, message: 'ill legal token: token has been edited, expired or not publish by us.', httpCode: StatusCodes.UNAUTHORIZED },
	TokenExpiredF: { code: 222, message: 'ill legal token: token has been expired.', httpCode: StatusCodes.UNAUTHORIZED },

	SignUpF: { code: 223, message: 'can not sign up: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	UserExistedF: { code: 224, message: 'user already existed, username must be unique.', httpCode: StatusCodes.BAD_REQUEST },
	SignInF: { code: 225, message: 'can not sign in: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	BadCredentialF: { code: 226, message: 'bad credentials: username or password not match.', httpCode: StatusCodes.UNAUTHORIZED },
	RetrieveProfileF: { code: 227, message: 'can not retrieve profile: try again later.', httpCode: StatusCodes.UNAUTHORIZED },
	// prettier-ignore
	MissingAuthorizationF: { code: 228, message: 'unauthorized: missing authorization or x-refresh-token header in header list.', httpCode: StatusCodes.UNAUTHORIZED },
	SignOutF: { code: 229, message: 'sign out not success: token not be recalled.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
	EnsureNotBadCredentialF: { code: 230, message: 'can not ensure token is not recalled.', httpCode: StatusCodes.UNAUTHORIZED },
	TokenBlockedF: { code: 231, message: 'token has been recall: can not use this any more', httpCode: StatusCodes.UNAUTHORIZED },
	TokenNotSuitableF: { code: 232, message: 'access token and refresh token are not suitable.', httpCode: StatusCodes.UNAUTHORIZED },
	RecallJwtTokenF: { code: 233, message: 'refresh token not success: token not be recalled.', httpCode: StatusCodes.UNAUTHORIZED },
	RefreshTokenF: { code: 234, message: 'can not refresh token: try again later.', httpCode: StatusCodes.INTERNAL_SERVER_ERROR },
});
