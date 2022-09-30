import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
	selectAllWorkouts,
	selectEditableWorkouts,
} from "../redux/features/workoutsSlice";

const WorkoutTimer = ({ workout }) => {
	const [timer, setTimer] = useState(5);
	const [isRunning, setIsRunning] = useState(false);
	const [isRestartAvailable, setIsRestartAvailable] = useState(false);
	const [remainder, setRemainder] = useState(0);
	const [total, setTotal] = useState(0);
	const [editable, setEditable] = useState(false);

	const allWorkouts = useSelector(selectAllWorkouts);
	const editableWorkouts = useSelector(selectEditableWorkouts);

	const firstStart = useRef(true);
	const tick = useRef();

	useEffect(() => {
		initializeDisplay();
	}, [allWorkouts]);

	useEffect(() => {
		if (editableWorkouts.includes(workout._id)) {
			setEditable(true);
		} else {
			setEditable(false);
		}
	}, [editableWorkouts]);

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

	const updateRemainder = () => {
		const newRemainder = remainder - 1;
		setRemainder(newRemainder);
	};

	const initializeDisplay = () => {
		allWorkouts.forEach((item) => {
			if (item._id === workout._id) {
				setRemainder(item.sets);
				setTotal(item.sets);
			}
		});
	};

	const handleStartTimer = () => {
		setIsRunning(true);
	};

	const handleStopTimer = () => {
		setIsRunning(false);
	};

	const handleNextTimer = () => {
		setTimer(5);
		setIsRunning(true);
		setIsRestartAvailable(false);
	};

	const handleRestartTimer = () => {
		setRemainder(total);
		setTimer(5);
		setIsRunning(true);
		setIsRestartAvailable(false);
	};

	return (
		<div className="timer-wrapper">
			<div className="timer-display">
				<h4>Workout Timer:</h4>
				<div className={`timer-count ${isRunning ? "active" : ""}`}>
					{timer}
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
