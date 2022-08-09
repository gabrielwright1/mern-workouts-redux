import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import WorkoutDetails from "../components/WorkoutDetails";

// slices
import {
	selectAllWorkouts,
	fetchWorkouts,
} from "../redux/features/workoutsSlice";

const Home = () => {
	const dispatch = useDispatch();
	const workouts = useSelector(selectAllWorkouts);
	const workoutStatus = useSelector((state) => state.workouts.status);
	const error = useSelector((state) => state.workouts.error);

	useEffect(() => {
		if (workoutStatus === "idle") {
			dispatch(fetchWorkouts());
		}
	}, [workoutStatus, dispatch]);

	let content;

	if (workoutStatus === "loading") {
		content = <h1>Loading</h1>;
	} else if (workoutStatus === "succeeded") {
		content = (
			<ul>
				{workouts.map((workout) => (
					// <li key={workout._id}>{workout.title}</li>
					<WorkoutDetails key={workout._id} workout={workout} />
				))}
			</ul>
		);
	} else if (workoutStatus === "failed") {
		content = <div>{error}</div>;
	}

	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default Home;
