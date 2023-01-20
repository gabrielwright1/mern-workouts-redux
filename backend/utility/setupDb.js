require('dotenv').config();

const mongoose = require('mongoose');

const setupDbConnection = async (app) => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(
				'connected to db & listening on port',
				process.env.PORT
			);
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = setupDbConnection;
