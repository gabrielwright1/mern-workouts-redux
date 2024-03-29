const cors = require('cors');
const express = require('express');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');
const setupDbConnection = require('./utility/setupDb');

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
app.use(
	cors({
		origin: ['https://mern-workouts-redux.onrender.com'],
	})
);

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
setupDbConnection(app);
