require('dotenv').config({ path: '../.env' });

const fs = require('fs');
const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const db = require("./config/db");

const app = express();

// https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true);
// https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false);

// setup our models
const modelsPath = path.resolve('./models');
fs.readdirSync(modelsPath)
	.filter(file => !file.search(/^[^.].*\.js$/))
	.forEach(file => require(path.join(modelsPath, file)));

// config the server
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';

// connects the db and then run the server
connect();

function listen() {
	app.listen(port, () => {
		console.log(`Listening on port: ${port}`);
		console.log(`Environment ${env}`);
	});
}

function connect() {
	mongoose.connection
		.on('error', console.log)
		.on('disconnected', connect)
		.once('open', listen);
	return mongoose.connect(db.connectionString, db.options);
}
