const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const UnauthorizedException = require('../exceptions/UnauthorizedException');

/**
 * Auth router, routes here are auto prefixed with /auth
 * contains routes used for authentication
 */
module.exports = (passport) => {
	const router = express.Router();

	/**
	 * This should be the first request the frontend makes. This determines if their
	 * cookie is still valid and to get them the user.
	 *
	 * Passport automatically validates the cookie and gets us the user, if it exists,
	 * on every request. Just respond with the user.
	 */
	router.get('/user', (req, res, next) => {
		console.log("user", { user: req.user })
		res.send(req.user)
	});

	/**
	 * Use passport authenticate method to attach the session and validate user sign-in.
	 * Redirecting to sign-in-fail seems to be the best way to alter error message,
	 * otherwise passport sends its own error message from the middleware
	 */
	router.post('/sign-in',
		passport.authenticate('local', { failureRedirect: 'sign-in-fail' }),
		(req, res, next) => {
			res.send(req.user)
		}
	);

	router.get('/sign-in-fail', (req, res, next) => {
		next(new UnauthorizedException("Invalid Email or Password"));
	});

	router.use('/register', require('./auth/register'));

	router.post('/sign-out', (req, res) => {
		req.logout();
		res.send("Sign out successfully");
	});

	return router;
}
