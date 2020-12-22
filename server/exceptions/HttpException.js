/**
 * Our base server Error to build off of. Lets us standardize messages and
 * response codes.
 *
 * ---You shouldn't throw this directly---
 * Use the other classes that are more specific.
 */
class HttpException extends Error {
	constructor(status, message, payload = null) {
		super(message);
		this.status = status;
		this.message = message;
		this.payload = payload;
	}
}

module.exports = HttpException;
