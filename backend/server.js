const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const setupDbConnection = require("./utility/setupDb");
const serveFrontend = require("./utility/serveFrontend");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "../frontend/build")));
// 	app.get("*", (req, res) =>
// 		res.sendFile(
// 			path.resolve(__dirname, "../", "frontend", "build", "index.html")
// 		)
// 	);
// } else {
// 	app.get("/", (req, res) => res.send("Please set to production mode"));
// }

// server frontend
serveFrontend(app);

// connect to db
setupDbConnection(app);
