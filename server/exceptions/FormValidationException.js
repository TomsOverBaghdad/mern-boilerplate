const HttpException = require('./HttpException');

/**
 * Exception to be thrown when form fails backend validation
 * payload should be a map of name of varable that failed to
 * the validation message
 */
class FormValidationException extends HttpException {
	constructor(message, payload = null) {
		super(422, message, payload);
	}
}

// https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
// errors is a hash of errors that contain individual ValidatorError instances.
// transform these into better messages
FormValidationException.formatMongooseValidationError = (errors) => {
	const keys = Object.keys(errors);
	return keys.reduce((payload, key) => {
		payload[key] = errors[key].kind;
		return payload;
	}, {});
}

module.exports = FormValidationException;
