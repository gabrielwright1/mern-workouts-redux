import { useDispatch } from "react-redux";

import { deleteWorkout } from "../redux/features/workoutsSlice";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
	const dispatch = useDispatch();

	const handleClick = async () => {
		await dispatch(deleteWorkout(workout));
	};

	return (
		<div className="workout-details">
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
				<br />
				{workout.createdAt}
			</p>
			<span className="material-symbols-outlined" onClick={handleClick}>
				delete
			</span>
		</div>
	);
};

export default WorkoutDetails;
