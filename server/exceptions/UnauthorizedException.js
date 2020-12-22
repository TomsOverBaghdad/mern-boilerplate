const HttpException = require('./HttpException');

/**
 * Exception to be thrown when user tries to access a route that requires a login
 * and is not authenticated with the server. Only send if the user is not logged on
 */
class UnauthorizedException extends HttpException {
	constructor(message = "Unauthorized. Please Sign In") {
		super(401, message);
	}
}

module.exports = UnauthorizedException;
