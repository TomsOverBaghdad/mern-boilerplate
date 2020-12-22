const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * This function is called when the `passport.authenticate()` method is called.
 *
 * If a user is found an validated, a callback is called (`done(null, user)`) with the user
 * object.  The user object is then serialized with `passport.serializeUser()` and added to the
 * `req.session.passport` object.
 */
module.exports = (passport) => {
	passport.use(new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		(email, password, done) => {
			console.log("user attempting login", { email })

			// The `+` includes properties that have select: false
			User.findOne({ email: email }, '+hashedPassword +salt').exec((err, user) => {
				console.log("user query done", { user })
				if (err) { return done(null, err) }
				if (!user) { return done(null, false) }

				const isValid = User.authenticate(password, user.hashedPassword, user.salt);
				// remove the values on the object since we don't want to send this data
				// to the frontend. The user could use these values to figure out peoples passwords
				delete user.hashedPassword;
				delete user.salt;
				return isValid ? done(null, user) : done(null, false);
			});
		}));

	/**
	 * This function is used in conjunction with the `passport.authenticate()` method.
	 * This is the value stored in the session store and is used to to query
	 * for the user and add the user to every request
	 */
	passport.serializeUser((user, next) => {
		console.log('serializeUser', { user: user })
		next(null, user);
	});

	/**
	 * This function is used in conjunction with the `app.use(passport.session())` middleware.
	 * This method is "set" on the passport object and is passed the user email stored in the `req.session.passport`
	 * object later on.
	 */
	passport.deserializeUser((user, next) => {
		console.log('deserializeUser', { id: user._id })
		User.findById(user._id).exec((err, user) => {
			if (err) { return next(err); }
			next(null, user);
		});
	});
}
