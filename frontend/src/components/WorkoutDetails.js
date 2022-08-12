import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// slices
import {
	openForm,
	deleteWorkout,
	selectEditableWorkouts,
} from "../redux/features/workoutsSlice";

// components
import WorkoutEditForm from "./WorkoutEditForm";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
	const dispatch = useDispatch();

	const [editable, setEditable] = useState(false);

	const editableWorkouts = useSelector(selectEditableWorkouts);

	useEffect(() => {
		if (editableWorkouts.includes(workout._id)) {
			setEditable(true);
		} else {
			setEditable(false);
		}
	}, [editableWorkouts, workout]);

	const handleDelete = async () => {
		dispatch(deleteWorkout(workout));
	};

	const handleEdit = async () => {
		dispatch(openForm(workout));
	};

	return (
		<li className="workout-details">
			{workout._id}
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong>
				{workout.load}
			</p>
			<p>
				<strong>Number of reps: </strong>
				{workout.reps}
			</p>
			<p>
				<strong>Created: </strong>
				{formatDistanceToNow(new Date(workout.createdAt), {
					addSuffix: true,
				})}
			</p>
			<p>
				<strong>Updated: </strong>
				{formatDistanceToNow(new Date(workout.updatedAt), {
					addSuffix: true,
				})}
			</p>
			{!editable && (
				<button className="edit-btn" type="submit" onClick={handleEdit}>
					Edit
				</button>
			)}
			<span className="material-symbols-outlined" onClick={handleDelete}>
				delete
			</span>
			{editable && <WorkoutEditForm workoutId={workout._id} />}
		</li>
	);
};

export default WorkoutDetails;
