const jwt = require("jsonwebtoken");

const createToken = (_id) => {
	// SYNTAX: jwt.sign(payload, secretOrPrivateKey, [options, callback]);
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

module.exports = createToken;
