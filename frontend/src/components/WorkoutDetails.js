import WorkoutTimer from "./WorkoutTimer";
import WorkoutCard from "./WorkoutCard";

const WorkoutDetails = ({ workout }) => {
	return (
		<li className="workout-details">
			<WorkoutCard workout={workout} />
			<WorkoutTimer workout={workout} />
		</li>
	);
};

export default WorkoutDetails;
