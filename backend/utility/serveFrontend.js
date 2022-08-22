const path = require("path");
const express = require("express");

const serveFrontend = (app) => {
	if (process.env.NODE_ENV === "production") {
		app.use(express.static(path.join(__dirname, "../frontend/build")));
		app.get("*", (req, res) =>
			res.sendFile(
				path.resolve(
					__dirname,
					"../",
					"frontend",
					"build",
					"index.html"
				)
			)
		);
	} else {
		app.get("/", (req, res) => res.send("Please set to production mode"));
	}
};

module.exports = serveFrontend;
