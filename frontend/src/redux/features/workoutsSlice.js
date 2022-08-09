// modules
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// initial state
const initialState = {
	workouts: [],
	status: "idle",
	error: null,
};

// async functions - thunks
export const fetchWorkouts = createAsyncThunk(
	"workouts/fetchWorkouts",
	async () => {
		const response = await fetch("/api/workouts");
		const json = response.json();
		console.log(json);
		return json;
	}
);

// slice
const workoutsSlice = createSlice({
	name: "workouts",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchWorkouts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchWorkouts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.workouts = state.workouts.concat(action.payload);
			})
			.addCase(fetchWorkouts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

// default export
export default workoutsSlice.reducer;

// selectors
export const selectAllWorkouts = (state) => state.workouts.workouts;
