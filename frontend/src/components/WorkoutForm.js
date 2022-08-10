import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	createWorkout,
	selectWorkoutStatus,
	selectWorkoutError,
	selectWorkoutFields,
} from "../redux/features/workoutsSlice";

const WorkoutForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const workoutStatus = useSelector(selectWorkoutStatus);
	const workoutError = useSelector(selectWorkoutError);
	const workoutFields = useSelector(selectWorkoutFields);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const workout = { title, load, reps };
		dispatch(createWorkout(workout));
	};

	useEffect(() => {
		if (workoutStatus === "failed") {
			setError(workoutError);
			setEmptyFields(workoutFields);
		}
		if (workoutStatus === "succeeded") {
			setEmptyFields([]);
			setError(null);
			setTitle("");
			setLoad("");
			setReps("");
		}
	}, [workoutStatus, workoutError, workoutFields]);

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>

			<label>Exercise Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes("title") ? "error" : ""}
			/>

			<label>Load (in kg):</label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyFields.includes("load") ? "error" : ""}
			/>

			<label>Number of Reps:</label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyFields.includes("reps") ? "error" : ""}
			/>

			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
