import { useDispatch } from "react-redux";
import { deleteWorkout } from "../redux/features/workoutsSlice";
import { useState } from "react";

// components
import WorkoutEditForm from "./WorkoutEditForm";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
	const dispatch = useDispatch();

	const [editable, setEditable] = useState(false);

	const handleDelete = async () => {
		dispatch(deleteWorkout(workout));
	};

	const handleEdit = async () => {
		setEditable(true);
	};

	return (
		<li className="workout-details">
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
				{formatDistanceToNow(new Date(workout.createdAt), {
					addSuffix: true,
				})}
			</p>
			{!editable && (
				<button className="edit-button" onClick={handleEdit}>
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
