
const getConnectionString = () => {
	const connectionString = process.env.NODE_ENV === 'production' ?
		process.env.DB_URL :
		process.env.DB_URL_LOCAL;
	if (!connectionString) {
		throw Error("No DB URL... did you set the environment variables?")
	}
	return connectionString;
}

module.exports = {
	connectionString: getConnectionString(),
	options: {
		keepAlive: 1,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
}
