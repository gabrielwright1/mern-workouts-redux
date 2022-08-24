import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	activeWorkouts: [],
};

const timerSlice = createSlice({
	name: "workouts",
	initialState,
	reducers: {
		addActiveWorkout: (state, action) => {
			state.activeWorkouts.push(action.payload._id);
		},
		removeActiveWorkout: (state, action) => {
			state.activeWorkouts = state.activeWorkouts.filter((workoutId) => {
				return workoutId !== action.payload._id;
			});
		},
	},
	extraReducers(builder) {},
});

export default timerSlice.reducer;

// actions
export const { addActiveWorkout, removeActiveWorkout } = timerSlice.actions;

// selectors
export const selectActiveWorkouts = (state) => state.timers.activeWorkouts;
