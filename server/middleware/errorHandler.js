const mongoose = require('mongoose');
const FormValidationException = require('../exceptions/FormValidationException');

/**
 * Standard error middleware, allows us to return the appropriate error response
 * since we have our HttpExceptions
 */
module.exports = (err, req, res, next) => {
	if (!err.status) {
		if (err instanceof mongoose.Error.ValidationError) {
			const formErrors = FormValidationException.formatMongooseValidationError(err.errors);
			err = new FormValidationException("Missing required fields", formErrors);
		} else {
			// log error for debugging purposes
			// this means it was an express or code error
			console.error("--Debug--");
			console.error(err);
		}
	}
	const status = err.status || 500;
	const message = err.message || "Something went wrong, please try again soon";
	const payload = err.payload || null;
	res.status(status)
		.send({
			status,
			message,
			payload,
		});
}
