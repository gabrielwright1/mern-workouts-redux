import WorkoutTimer from "./WorkoutTimer";
import WorkoutCard from "./WorkoutCard";
import WorkoutEditForm from "./WorkoutEditForm";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectEditableWorkouts } from "../redux/features/workoutsSlice";

const WorkoutDetails = ({ workout }) => {
	const [editable, setEditable] = useState(false);
	const editableWorkouts = useSelector(selectEditableWorkouts);

	useEffect(() => {
		if (editableWorkouts.includes(workout._id)) {
			setEditable(true);
		} else {
			setEditable(false);
		}
	}, [editableWorkouts, workout]);

	return (
		<li className="workout-details">
			<div className="upper-wrapper">
				<WorkoutCard workout={workout} editable={editable} />
				<WorkoutTimer workout={workout} />
			</div>
			<div className="lower-wrapper">
				{editable && <WorkoutEditForm workoutId={workout._id} />}
			</div>
		</li>
	);
};

export default WorkoutDetails;
