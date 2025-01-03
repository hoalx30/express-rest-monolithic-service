const { StatusCodes } = require('http-status-codes');

module.exports = Object.freeze({
	SaveS: { code: 1, message: '{resource} has been saved.', httpCode: StatusCodes.CREATED },
	FindByIdS: { code: 1, message: 'query {resource} by id success.', httpCode: StatusCodes.OK },
	FindAllS: { code: 1, message: 'query {resource} success.', httpCode: StatusCodes.OK },
	FindAllByS: { code: 1, message: 'query {resource} by {criteria} success.', httpCode: StatusCodes.OK },
	FindArchivedS: { code: 1, message: 'query {resource} by {criteria} success.', httpCode: StatusCodes.OK },
	UpdateS: { code: 1, message: '{resource} has been updated.', httpCode: StatusCodes.OK },
	DeleteS: { code: 1, message: '{resource} has been deleted.', httpCode: StatusCodes.OK },
	SignUpS: { code: 1, message: 'sign up success, enjoy.', httpCode: StatusCodes.CREATED },
	SignInS: { code: 1, message: 'sign in success, enjoy.', httpCode: StatusCodes.OK },
	RetrieveProfileS: { code: 1, message: 'retrieve profile success, enjoy.', httpCode: StatusCodes.OK },
	SignOutS: { code: 1, message: 'sign out success, enjoy.', httpCode: StatusCodes.OK },
	RefreshTokenS: { code: 1, message: 'refresh token success, enjoy.', httpCode: StatusCodes.OK },
});
