const UnauthorizedError = require("../exceptions/UnauthorizedException");

module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	next(new UnauthorizedError())
}
