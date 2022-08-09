import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// slices
import {
	selectAllWorkouts,
	fetchWorkouts,
	selectWorkoutStatus,
} from "../redux/features/workoutsSlice";

const Home = () => {
	const dispatch = useDispatch();
	const workouts = useSelector(selectAllWorkouts);
	const workoutStatus = useSelector(selectWorkoutStatus);

	useEffect(() => {
		if (workoutStatus === "idle") {
			dispatch(fetchWorkouts());
		}
	}, [workoutStatus, dispatch]);

	return (
		<section className="workouts-list">
			<WorkoutForm />
			<h2>Workouts</h2>
			<ul>
				{workouts.map((workout) => (
					<WorkoutDetails key={workout._id} workout={workout} />
				))}
			</ul>
		</section>
	);
};

export default Home;
