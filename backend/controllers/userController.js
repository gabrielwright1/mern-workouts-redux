// model
const User = require("../models/userModel");

const loginUser = (req, res) => {
	res.status(200).json({ mssg: "login works" });
};

const signupUser = (req, res) => {
	res.status(200).json({ mssg: "signup works" });
};

module.exports = { loginUser, signupUser };
