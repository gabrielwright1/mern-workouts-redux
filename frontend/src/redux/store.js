import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./features/workoutsSlice";

export default configureStore({
	reducer: {
		workouts: workoutReducer,
	},
});
