import WorkoutEditForm from "./WorkoutEditForm";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
	openForm,
	deleteWorkout,
	selectEditableWorkouts,
} from "../redux/features/workoutsSlice";
import { selectUser } from "../redux/features/userSlice";

const WorkoutCard = ({ workout }) => {
	const dispatch = useDispatch();

	const [editable, setEditable] = useState(false);

	const editableWorkouts = useSelector(selectEditableWorkouts);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (editableWorkouts.includes(workout._id)) {
			setEditable(true);
		} else {
			setEditable(false);
		}
	}, [editableWorkouts, workout]);

	const handleDelete = async () => {
		dispatch(deleteWorkout({ workout, user }));
	};

	const handleEdit = async () => {
		dispatch(openForm(workout));
	};

	return (
		<div className="form-wrapper">
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
				<strong>Number of sets: </strong>
				{workout.sets}
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
		</div>
	);
};

export default WorkoutCard;
