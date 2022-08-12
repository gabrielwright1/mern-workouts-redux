import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// slices
import {
	selectAllWorkouts,
	selectFetchError,
} from "../redux/features/workoutsSlice";

const Home = () => {
	const workouts = useSelector(selectAllWorkouts);
	const fetchError = useSelector(selectFetchError);

	return (
		<section className="workouts-list">
			<WorkoutForm />
			<h2>Workouts</h2>
			{fetchError && <p className="fetchError">Error: {fetchError}</p>}
			<ul>
				{workouts.map((workout) => (
					<WorkoutDetails key={workout._id} workout={workout} />
				))}
			</ul>
		</section>
	);
};

export default Home;
