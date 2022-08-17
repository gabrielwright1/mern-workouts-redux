const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
	// pull auth from header
	// validate if auth exists, if so, grab the token
	// try to verify token using secret/private key
	// pull out the payload (_id) from the auth string (header, payload, signature)
	// use payload (_id) to find the user in the db
	// trigger next middleware

	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: "Authorization token required" });
	}

	const token = authorization.split(" ")[1];

	try {
		const { _id } = jwt.verify(token, process.env.SECRET);
		req.user = await User.findOne({ _id }).select("_id");
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: "Request is not authorized" });
	}
};

module.exports = requireAuth;
