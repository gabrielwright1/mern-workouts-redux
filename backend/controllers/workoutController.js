const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// @desc      Get workouts
// @route     GET /api/workouts
// @access    Private
const getWorkouts = async (req, res) => {
	const user_id = req.user._id;

	const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

	res.status(200).json(workouts);
};

// @desc      Get a workout
// @route     GET /api/workouts/:id
// @access    Private
const getWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" });
	}

	const workout = await Workout.findById(id);

	if (!workout) {
		return res.status(404).json({ error: "No such workout" });
	}

	res.status(200).json(workout);
};

// @desc      Create a new workout
// @route     POST /api/workouts/
// @access    Private
const createWorkout = async (req, res) => {
	const user_id = req.user._id;

	const { title, load, reps, sets } = req.body;

	let emptyFields = [];

	if (!title) {
		emptyFields.push("title");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (!reps) {
		emptyFields.push("reps");
	}
	if (!sets) {
		emptyFields.push("sets");
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all fields", emptyFields });
	}

	try {
		const workout = await Workout.create({
			title,
			load,
			reps,
			sets,
			user_id,
		});
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// @desc      Delete a workout
// @route     DELETE /api/workouts/:id
// @access    Private
const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such workout" });
	}

	const workout = await Workout.findOneAndDelete({ _id: id });

	if (!workout) {
		return res.status(400).json({ error: "No such workout" });
	}

	res.status(200).json(workout);
};

// @desc      Update a workout
// @route     PATCH /api/workouts/:id
// @access    Private
const updateWorkout = async (req, res) => {
	const { id } = req.params;
	const { title, load, reps, sets } = req.body;
	let emptyFields = [];

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such workout" });
	}

	// validate form inputs
	if (!title) {
		emptyFields.push("title");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (!reps) {
		emptyFields.push("reps");
	}
	if (!sets) {
		emptyFields.push("sets");
	}
	if (emptyFields.length > 0) {
		return res.status(400).json({
			error: "Please fill in all fields",
			emptyFields,
			id,
			title,
			load,
			reps,
			sets,
		});
	}

	const workout = await Workout.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		},
		{ returnDocument: "after" }
	);

	if (!workout) {
		return res.status(400).json({ error: "No such workout" });
	}

	res.status(200).json(workout);
};

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
