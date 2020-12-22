const express = require('express');
const session = require('express-session');
const helmet = require("helmet");
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const db = require("./db");

const selfCSP = ["'self'"];

module.exports = (app, passport) => {
	app.use(helmet({
		// the defaults found at:
		// https://github.com/helmetjs/helmet/blob/master/middlewares/content-security-policy/index.ts#L20
		// Need to research a bit more on these specific policies and cut down what is actually needed
		contentSecurityPolicy: {
			directives: {
				defaultSrc: selfCSP,
				baseUri: selfCSP,
				blockAllMixedContent: [],
				fontSrc: selfCSP.concat(["https:", "data:"]),
				frameAncestors: selfCSP,
				frameSrc: selfCSP.concat(["data:"]), // new
				imgSrc: selfCSP.concat(["data:"]),
				objectSrc: ["'none'"],
				scriptSrc: selfCSP.concat(["https://cdnjs.cloudflare.com"]), // changed
				scriptSrcAttr: ["'none'"],
				styleSrc: selfCSP.concat(["https:", "'unsafe-inline'"]),
				upgradeInsecureRequests: [],
				workerSrc: selfCSP.concat(["blob:"]), // new
			},
		},
	}));

	app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	/**
	 * -------------- SESSION SETUP ----------------
	 */
	/**
	 * See the documentation for all possible options - https://www.npmjs.com/package/express-session
	 *
	 * As a brief overview:
	 *
	 * secret: This is a random string that will be used to "authenticate" the session.  In a production environment,
	 * you would want to set this to a long, randomly generated string
	 *
	 * resave: when set to true, this will force the session to save even if nothing changed.  If you don't set this,
	 * the app will still run but you will get a warning in the terminal
	 *
	 * saveUninitialized: Similar to resave, when set true, this forces the session to be saved even if it is unitialized
	 *
	 * store: Sets the MemoryStore to the MongoStore setup earlier in the code.  This makes it so every new session will be
	 * saved in a MongoDB database in a "sessions" table and used to lookup sessions
	 *
	 * cookie: The cookie object has several options, but the most important is the `maxAge` property.  If this is not set,
	 * the cookie will expire when you close the browser.
	 */
	const MINUTE = 60000;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;
	const sessionStore = new MongoStore({ url: db.connectionString, collection: 'sessions' })
	if (process.env.NODE_ENV === 'production' && !process.env.COOKIE_SECRET) {
		throw new Error("Failed to start session middleware: Missing cookie secret");
	}
	// TODO once done testing this remove the dev check and move the max age to .env
	// const MAX_AGE = process.env.NODE_ENV === "development" ? (MINUTE / 2) : (DAY * 30);
	const MAX_AGE = DAY * 30;

	app.use(session({
		secret: process.env.COOKIE_SECRET || "dev_secret",
		resave: false,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: MAX_AGE, // value in milliseconds
		}
	}));

	/**
	 * -------------- PASSPORT AUTHENTICATION ----------------
	 * https://levelup.gitconnected.com/everything-you-need-to-know-about-the-passport-local-passport-js-strategy-633bbab6195
	 */
	/**
	 * These middlewares are initialized after the `express-session` middleware.  This is because
	 * Passport relies on the `express-session` middleware and must have access to the `req.session` object.
	 *
	 * passport.initialize() - This creates middleware that runs before every HTTP request.  It works in two steps:
	 *      1. Checks to see if the current session has a `req.session.passport` object on it.  This object will be
	 *          { user: '<Mongo DB user ID>' }
	 *
	 *      2.  If it finds a session with a `req.session.passport` property, it grabs the User ID and saves it to an
	 *          internal Passport method for later.
	 *
	 * passport.session() - This calls the Passport Authenticator using the "Session Strategy".  Here are the basic
	 * steps that this method takes:
	 *      1.  Takes the MongoDB user ID obtained from the `passport.initialize()` method (run directly before) and passes
	 *          it to the `passport.deserializeUser()` function (defined above in this module).  The `passport.deserializeUser()`
	 *          function will look up the User by the given ID in the database and return it.
	 *      2.  If the `passport.deserializeUser()` returns a user object, this user object is assigned to the `req.user` property
	 *          and can be accessed within the route.  If no user is returned, nothing happens and `next()` is called.
	 */
	app.use(passport.initialize());
	app.use(passport.session());
}
