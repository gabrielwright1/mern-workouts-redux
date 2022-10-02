import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { selectUser } from "../redux/features/userSlice";
import { openForm, deleteWorkout } from "../redux/features/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";

const WorkoutCard = ({ workout, editable }) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const handleDelete = async () => {
		dispatch(deleteWorkout({ workout, user }));
	};

	const handleEdit = async () => {
		dispatch(openForm(workout));
	};

	return (
		<div className="display-wrapper">
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
			<span
				className="remove-btn material-symbols-outlined"
				onClick={handleDelete}
			>
				delete
			</span>
			{!editable && (
				<button className="edit-btn" type="submit" onClick={handleEdit}>
					Edit
				</button>
			)}
		</div>
	);
};

export default WorkoutCard;
