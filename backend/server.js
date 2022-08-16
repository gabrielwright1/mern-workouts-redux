const express = require("express");
const workoutRoutes = require("./routes/workouts");
const setupDbConnection = require("./utility/setupDb");

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

// connect to db
setupDbConnection(app);
