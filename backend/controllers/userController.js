// model
const User = require("../models/userModel");
const createToken = require("../utility/createToken");

// @desc      Authenticate user
// @route     POST /api/user/login
// @access    Public
const loginUser = async (req, res) => {
	// pull out the email/password from the request
	// try to login, store the user if successful
	// create a token based on the user id
	// return email/token, status 200
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// @desc    Register new user
// @route   POST /api/user/signup
// @access  Public
const signupUser = async (req, res) => {
	// pull out the email/password from the request
	// try to signup, store user if successful
	// create a token based on user id
	// return email/token, status 200
	const { email, password } = req.body;

	try {
		const user = await User.signup(email, password);
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { loginUser, signupUser };
