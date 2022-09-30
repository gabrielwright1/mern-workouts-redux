import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutCard = ({ workout }) => {
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
		</div>
	);
};

export default WorkoutCard;
