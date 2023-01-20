const path = require('path');
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

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
setupDbConnection(app);
