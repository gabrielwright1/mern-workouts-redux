import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	closeForm,
	updateWorkout,
	selectErroredWorkouts,
} from "../redux/features/workoutsSlice";

const WorkoutEditForm = ({ workoutId }) => {
	const dispatch = useDispatch();

	const [id, setId] = useState(workoutId);
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const erroredWorkouts = useSelector(selectErroredWorkouts);

	useEffect(() => {
		erroredWorkouts.forEach((workout) => {
			if (workout.id === workoutId) {
				setEmptyFields(workout.emptyFields);
				setError("Please fill in all fields");
			}
		});
	}, [erroredWorkouts, workoutId]);

	// useEffect(() => {
	// 	if (workoutStatus === "failed") {
	// 		setError(workoutError);
	// 		setEmptyFields(workoutFields);
	// 	}
	// 	if (workoutStatus === "succeeded") {
	// 		setEmptyFields([]);
	// 		setError(null);
	// 		setTitle("");
	// 		setLoad("");
	// 		setReps("");
	// 	}
	// }, [workoutStatus, workoutError, workoutFields]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const workout = { id, title, load, reps };
		dispatch(updateWorkout(workout));
	};

	const handleClose = (e) => {
		const workout = { id, title, load, reps };
		dispatch(closeForm(workout));
	};

	return (
		<form className="edit" onSubmit={handleSubmit}>
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
			<button className="close-btn" type="button" onClick={handleClose}>
				Close
			</button>
			<button className="update-btn" type="submit">
				Update
			</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutEditForm;
