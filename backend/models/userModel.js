// depdencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// create a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// export model (based on schema)
module.exports = mongoose.model("User", userSchema);
