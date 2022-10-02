import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
	selectAllWorkouts,
	selectEditableWorkouts,
} from "../redux/features/workoutsSlice";

const WorkoutTimer = ({ workout }) => {
	const [baseTime, setBaseTime] = useState(10);
	const [timer, setTimer] = useState();
	const [isRunning, setIsRunning] = useState(false);
	const [isRestartAvailable, setIsRestartAvailable] = useState(false);
	const [remainder, setRemainder] = useState(0);
	const [total, setTotal] = useState(0);
	const [isDisabled, setIsDisabled] = useState(false);

	const allWorkouts = useSelector(selectAllWorkouts);

	const firstStart = useRef(true);
	const tick = useRef();

	useEffect(() => {
		initializeDisplay();
	}, [allWorkouts]);

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
			updateRemainder();
			setIsRestartAvailable(true);
			setIsRunning(false);
		}
	}, [timer]);

	useEffect(() => {
		setTimer(baseTime);
		baseTime <= 5 ? setIsDisabled(true) : setIsDisabled(false);
	}, [baseTime]);

	const initializeDisplay = () => {
		const selectedWorkout = allWorkouts.find(
			(element) => element._id === workout._id
		);
		setRemainder(selectedWorkout.sets);
		setTotal(selectedWorkout.sets);
	};

	const updateRemainder = () => {
		const newRemainder = remainder - 1;
		setRemainder(newRemainder);
	};

	const handleStartTimer = () => {
		setIsRunning(true);
	};

	const handleStopTimer = () => {
		setIsRunning(false);
	};

	const handleNextTimer = () => {
		setTimer(baseTime);
		setIsRunning(true);
		setIsRestartAvailable(false);
	};

	const handleRestartTimer = () => {
		setRemainder(total);
		setTimer(baseTime);
		setIsRunning(true);
		setIsRestartAvailable(false);
	};

	const handleIncrement = () => {
		const newTime = baseTime + 5;
		setBaseTime(newTime);
	};
	const handleDecrement = () => {
		const newTime = baseTime - 5;
		if (baseTime > 5) setBaseTime(newTime);
	};

	return (
		<div className="timer-wrapper">
			<div className="timer-display">
				<h4>Workout Timer:</h4>
				<div
					className={`timer-display-panel ${
						isRunning ? "active" : ""
					}`}
				>
					<div className="timer-count">{timer}</div>
					<div className="timer-buttons">
						<button className="increment" onClick={handleIncrement}>
							+
						</button>
						<button
							className={`decrement ${
								isDisabled ? "disabled" : ""
							}`}
							onClick={handleDecrement}
							disabled={isDisabled}
						>
							-
						</button>
					</div>
				</div>
				<div className="timer-remainder">
					Remaining sets: {remainder}
				</div>
				<div className="timer-controls">
					{isRestartAvailable && remainder > 0 && (
						<button className="next-btn" onClick={handleNextTimer}>
							Next Round
						</button>
					)}

					{isRestartAvailable && remainder === 0 && (
						<button
							className="restart-btn"
							onClick={handleRestartTimer}
						>
							Restart
						</button>
					)}

					{!isRunning && !isRestartAvailable && (
						<button
							className="start-btn"
							onClick={handleStartTimer}
						>
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
		</div>
	);
};

export default WorkoutTimer;
