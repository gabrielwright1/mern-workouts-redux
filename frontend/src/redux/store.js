import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./features/workoutsSlice";
import userReducer from "./features/userSlice";

export default configureStore({
	reducer: {
		workouts: workoutReducer,
		users: userReducer,
	},
});
