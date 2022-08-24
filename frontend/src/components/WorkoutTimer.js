import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveWorkouts } from "../redux/features/timerSlice";
import {
	addActiveWorkout,
	removeActiveWorkout,
} from "../redux/features/timerSlice";

const WorkoutTimer = ({ workout }) => {
	let countdown;

	const dispatch = useDispatch();
	const activeWorkouts = useSelector(selectActiveWorkouts);
	const [timer, setTimer] = useState("");
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (activeWorkouts.includes(workout._id)) {
			setIsRunning(true);
		} else {
			setIsRunning(false);
		}
	}, [activeWorkouts]);

	useEffect(() => {
		if (isRunning) {
			runTimer(5);
		}
	}, [isRunning]);

	const runTimer = (seconds) => {
		const now = Date.now();
		const then = now + seconds * 1000;

		countdown = setInterval(() => {
			const secondsLeft = Math.round((then - Date.now()) / 1000);
			if (secondsLeft < 0) {
				setIsRunning(false);
				stopTimer();
				return;
			}
			setTimer(secondsLeft);
		});
	};

	const stopTimer = () => {
		clearInterval(countdown);
	};

	const handleStartTimer = () => {
		dispatch(addActiveWorkout(workout));
	};
	const handleStopTimer = () => {
		dispatch(removeActiveWorkout(workout));
		stopTimer();
	};

	return (
		<div className="timer-wrapper">
			<div className="timer-display">
				<p>
					<strong>Timer: </strong>
					<br />
					{timer}
				</p>
			</div>
			<div className="timer-controls">
				{!isRunning && (
					<button className="start-btn" onClick={handleStartTimer}>
						Start
					</button>
				)}
				{isRunning && (
					<button className="stop-btn" onClick={handleStopTimer}>
						Stop
					</button>
				)}
			</div>
		</div>
	);
};

export default WorkoutTimer;
