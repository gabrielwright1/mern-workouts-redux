import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveWorkouts } from "../redux/features/timerSlice";
import {
	addActiveWorkout,
	removeActiveWorkout,
} from "../redux/features/timerSlice";

const WorkoutTimer = ({ workout }) => {
	const dispatch = useDispatch();

	const [timer, setTimer] = useState(5);
	const [isRunning, setIsRunning] = useState(false);
	const [isRestartAvailable, setIsRestartAvailable] = useState(false);

	const firstStart = useRef(true);
	const tick = useRef();

	useEffect(() => {
		if (firstStart.current) {
			firstStart.current = !firstStart.current;
			return;
		}

		if (isRunning) {
			tick.current = setInterval(() => {
				setTimer((timer) => timer - 1);
			}, 1000);
		}

		return () => clearInterval(tick.current);
	}, [isRunning]);

	useEffect(() => {
		if (timer <= 0) {
			setIsRestartAvailable(true);
			setIsRunning(false);
		}
	}, [timer]);

	const handleStartTimer = () => {
		dispatch(addActiveWorkout(workout));
		setIsRunning(true);
	};

	const handleStopTimer = () => {
		dispatch(removeActiveWorkout(workout));
		setIsRunning(false);
	};

	const handleRestartTimer = () => {
		setTimer(5);
		setIsRunning(true);
		setIsRestartAvailable(false);
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
				{isRestartAvailable && (
					<button
						className="restart-btn"
						onClick={handleRestartTimer}
					>
						Restart
					</button>
				)}

				{!isRunning && !isRestartAvailable && (
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
