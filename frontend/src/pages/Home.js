import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// slices
import {
	selectAllWorkouts,
	selectFetchError,
	fetchWorkouts,
} from "../redux/features/workoutsSlice";
import { selectUser } from "../redux/features/userSlice";

const Home = () => {
	const dispatch = useDispatch();

	const workouts = useSelector(selectAllWorkouts);
	const fetchError = useSelector(selectFetchError);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (user) {
			dispatch(fetchWorkouts(user));
		}
	}, [user, dispatch]);

	return (
		<section className="workouts-list">
			<WorkoutForm />
			<h2>Saved Workouts</h2>
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
