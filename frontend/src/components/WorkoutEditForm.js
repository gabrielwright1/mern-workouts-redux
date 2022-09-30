import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	closeForm,
	updateWorkout,
	selectErroredWorkouts,
} from "../redux/features/workoutsSlice";

import { selectUser } from "../redux/features/userSlice";

const WorkoutEditForm = ({ workoutId }) => {
	const dispatch = useDispatch();

	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [sets, setSets] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const erroredWorkouts = useSelector(selectErroredWorkouts);
	const user = useSelector(selectUser);

	useEffect(() => {
		setId(workoutId);
		erroredWorkouts.forEach((workout) => {
			if (workout.id === workoutId) {
				setEmptyFields(workout.emptyFields);
				setError(workout.error);
			}
		});
	}, [erroredWorkouts, workoutId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const workout = { id, title, load, reps, sets };
		dispatch(updateWorkout({ workout, user }));
	};

	const handleClose = (e) => {
		const workout = { id };
		dispatch(closeForm(workout));
	};

	return (
		<form className="edit" onSubmit={handleSubmit}>
			<label htmlFor="edit-workout-title">Exercise Title:</label>
			<input
				id="edit-workout-title"
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes("title") ? "error" : ""}
			/>

			<label htmlFor="edit-workout-load">Load (in kg):</label>
			<input
				id="edit-workout-load"
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyFields.includes("load") ? "error" : ""}
			/>

			<label htmlFor="edit-workout-reps">Number of Reps:</label>
			<input
				id="edit-workout-reps"
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyFields.includes("reps") ? "error" : ""}
			/>

			<label htmlFor="edit-workout-sets">Number of Sets:</label>
			<input
				id="edit-workout-sets"
				type="number"
				onChange={(e) => setSets(e.target.value)}
				value={sets}
				className={emptyFields.includes("sets") ? "error" : ""}
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
