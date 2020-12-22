const express = require('express');
const path = require('path');

const errorHandler = require('../middleware/errorHandler');
const validateLogIn = require('../middleware/validateLogIn');

/**
 * Set up our routes, this file is for our base routers
 * each router will have routes / routers in them as needed
 * @param  {Express} app
 * @param  {Passport} passport
 */
module.exports = (app, passport) => {
	const authRouter = require('../routers/auth')(passport);
	const apiRouter = require('../routers/api')();

	/**
	 * We shouldn't need to add any more routers here since all our routes
	 * are either our api or our auth. Only add a router he
	 */
	app.use('/auth', authRouter);

	// **** validateLogIn commented out for testing for testing ***
	// app.use('/api', validateLogIn, apiRouter);
	app.use('/api', apiRouter);

	// only serve react app from express on production server
	// since requests get proxied by webpack locally
	if (process.env.NODE_ENV === 'production') {
		const buildPath = path.resolve("../client/build");
		app.use(express.static(buildPath));
		// serve the html from unkonwn paths due to using react router on the front end
		// https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing
		app.get("/*", function (req, res) {
			res.sendFile(path.join(buildPath, "index.html"));
		});
	}
	// must be last following the the frontend endpoints
	// https://expressjs.com/en/guide/error-handling.html
	app.use(errorHandler);
}
