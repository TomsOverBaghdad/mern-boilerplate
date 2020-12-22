const express = require('express');
const mongoose = require('mongoose');
const FormValidationException = require('../../exceptions/FormValidationException');

const router = express.Router({ mergeParams: true });
const User = mongoose.model('User');

/**
 * auth/register
 */

router.post('/new', async (req, res, next) => {
	let user = null;
	try {
		const { firstName, lastName, email, password } = req.body;
		const { salt, hashedPassword } = User.encryptPassword(password);
		user = await User.create({
			firstName,
			lastName,
			email,
			hashedPassword,
			salt,
		});
		req.login(user, (err) => {
			if (err) { return next(err); }
			return res.send(req.user);
		});
	} catch (err) {
		if (user) await User.remove(user);

		// TODO handle these more gracefully
		if (err.name === "MongoError" && err.code === 11000) {
			next(new FormValidationException("Account already exists"));
		}
		else if (err instanceof mongoose.Error.ValidationError) {
			// TODO
			// FormValidationException.formatMongooseValidationError(err.errors)
			next(new FormValidationException("Account already exists"));
		}
		next(err);
	}
});

module.exports = router;
