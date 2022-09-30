import WorkoutTimer from "./WorkoutTimer";
import WorkoutCard from "./WorkoutCard";
import WorkoutEditForm from "./WorkoutEditForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	openForm,
	deleteWorkout,
	selectEditableWorkouts,
} from "../redux/features/workoutsSlice";
import { selectUser } from "../redux/features/userSlice";

const WorkoutDetails = ({ workout }) => {
	const [editable, setEditable] = useState(false);
	const editableWorkouts = useSelector(selectEditableWorkouts);
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const handleDelete = async () => {
		dispatch(deleteWorkout({ workout, user }));
	};

	const handleEdit = async () => {
		dispatch(openForm(workout));
	};

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
				<WorkoutCard workout={workout} />
				<WorkoutTimer workout={workout} />
				<span
					className="remove-btn material-symbols-outlined"
					onClick={handleDelete}
				>
					delete
				</span>
			</div>
			<div className="lower-wrapper">
				{editable && <WorkoutEditForm workoutId={workout._id} />}
				{!editable && (
					<button
						className="edit-btn"
						type="submit"
						onClick={handleEdit}
					>
						Edit
					</button>
				)}
			</div>
		</li>
	);
};

export default WorkoutDetails;
