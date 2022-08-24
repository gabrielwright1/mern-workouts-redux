import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./features/workoutsSlice";
import userReducer from "./features/userSlice";
import timerReducer from "./features/timerSlice";

export default configureStore({
	reducer: {
		workouts: workoutReducer,
		users: userReducer,
		timers: timerReducer,
	},
});
