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

// static methods - use ES5 because we use "this"
userSchema.statics.signup = async function (email, password) {
	// form validation
	if (!email || !password) {
		throw Error("All fields must be filled");
	}
	if (!validator.isEmail(email)) {
		throw Error("Email not valid");
	}
	if (!validator.isStrongPassword(password)) {
		throw Error(
			"Password must be 8 characters. Please include uppercase, lowercase, number, and special character"
		);
	}

	// check if its already in use
	const exists = await this.findOne({ email });

	if (exists) {
		throw Error("Email already in use");
	}

	// salt+hash the password
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	// create user
	const user = await this.create({ email, password: hash });

	return user;
};

userSchema.statics.login = async function (email, password) {
	// form validation
	if (!email || !password) {
		throw Error("All fields must be filled");
	}
	// find user, check password
	const user = await this.findOne({ email });
	if (!user) {
		throw Error("Incorrect email");
	}
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		throw Error("Incorrect password");
	}

	return user;
};

// export model (based on schema)
module.exports = mongoose.model("User", userSchema);
