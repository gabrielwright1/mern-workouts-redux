import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	createWorkout,
	selectCreateFormEmptyFields,
	selectCreateFormError,
	selectCreateFormStatus,
} from "../redux/features/workoutsSlice";
import { selectUser } from "../redux/features/userSlice";

const WorkoutForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [sets, setSets] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const createFormEmptyFields = useSelector(selectCreateFormEmptyFields);
	const createFormStatus = useSelector(selectCreateFormStatus);
	const createFormError = useSelector(selectCreateFormError);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (createFormStatus === "failed") {
			setEmptyFields(createFormEmptyFields);
			setError(createFormError);
		}
		if (createFormStatus === "succeeded") {
			setEmptyFields([]);
			setError(null);
			setTitle("");
			setLoad("");
			setReps("");
			setSets("");
		}
	}, [createFormStatus, createFormError, createFormEmptyFields]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const workout = { title, load, reps, sets };
		dispatch(createWorkout({ workout, user }));
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h2>Add a New Workout</h2>

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

			<label>Number of Sets:</label>
			<input
				type="number"
				onChange={(e) => setSets(e.target.value)}
				value={sets}
				className={emptyFields.includes("sets") ? "error" : ""}
			/>

			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
