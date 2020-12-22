const express = require('express');
validateLogIn = require('../middleware/validateLogIn');

/**
 * Api router, routes here are auto prefixed with /api
 * contains routes used for authentication
 */
module.exports = () => {
	const router = express.Router({ mergeParams: true });

	// put paths here
	// router.use('/my-sick-path', validateLogIn, require('./api/my-sick-path'));

	return router;
}
