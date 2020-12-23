const mongoose = require('mongoose');
const crypto = require('crypto');

const { model, Schema } = mongoose;

// To be consistent, this is the same regex that ant design uses
// http://emailregex.com/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true, match: emailRegex },
	firstName: { type: String, required: true, trim: true, maxlength: 32 },
	lastName: { type: String, required: true, trim: true, maxlength: 32 },

	/**
	 * Values not to select by default on queries.
	 * select: false
	 */
	hashedPassword: { type: String, required: true, select: false },
	salt: { type: String, required: true, select: false },
},
	{ timestamps: true }
);

/**
 * Static methods
 *
 * Use static methods over instance methods when we can. This allows
 * for more flexibility when we can use lean() in our GET queries
 */
UserSchema.statics = {
	/**
	 *
	 * @param {String} plainText - The plain text password
	 * @param {String} hashedPassword - The hash stored in the database
	 * @param {String} salt - The salt stored in the database
	 *
	 * This function uses the crypto library to decrypt the hash using the salt and then compares
	 * the decrypted hash/salt with the password that the user provided at login
	 */
	authenticate: (plainText, hashedPassword, salt) => {
		return hashedPassword === crypto.pbkdf2Sync(plainText, salt, 10000, 64, 'sha512').toString('hex');
	},

	/**
	 *
	 * @param {String} plainText - The plain text password
	 *
	 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
	 * password in the database, the salt and hash are stored for security
	 */
	encryptPassword: (plainText) => {
		var salt = crypto.randomBytes(32).toString('hex');
		var hashedPassword = crypto.pbkdf2Sync(plainText, salt, 10000, 64, 'sha512').toString('hex');

		return {
			salt,
			hashedPassword
		};
	}
}

module.exports = model('User', UserSchema);
