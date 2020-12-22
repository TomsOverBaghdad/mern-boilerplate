const HttpException = require('./HttpException');

/**
 * Exception to be thrown when user tries to access a route or resource
 * without having the appropriate roles
 */
class ForbiddenException extends HttpException {
	constructor(message = "Can't access this resource") {
		super(403, message);
	}
}

module.exports = ForbiddenException;
