// modules
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// initial state
const initialState = {
	workouts: [],
	emptyFields: [],
	status: "idle",
	error: null,
};

// async functions - thunks
export const fetchWorkouts = createAsyncThunk(
	"workouts/fetchWorkouts",
	async () => {
		const response = await fetch("/api/workouts");
		return response.json();
	}
);

export const deleteWorkout = createAsyncThunk(
	"workouts/deleteWorkout",
	async (workout) => {
		const response = await fetch(`/api/workouts/${workout._id}`, {
			method: "DELETE",
		});
		return response.json();
	}
);
export const updateWorkout = createAsyncThunk(
	"workouts/updateWorkout",
	async (workout, { rejectWithValue }) => {
		const response = await fetch(`/api/workouts/${workout.id}`, {
			method: "PATCH",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			const json = await response.json();
			return rejectWithValue(json);
		}
		if (response.ok) {
			return response.json();
		}
	}
);

export const createWorkout = createAsyncThunk(
	"workouts/createWorkout",
	async (workout, { rejectWithValue }) => {
		const response = await fetch("/api/workouts", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const json = await response.json();
			return rejectWithValue(json);
		}

		if (response.ok) {
			return response.json();
		}
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
			})
			.addCase(deleteWorkout.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deleteWorkout.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.workouts = state.workouts.filter((workout) => {
					return workout._id !== action.payload._id;
				});
			})
			.addCase(deleteWorkout.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createWorkout.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(createWorkout.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.workouts = [action.payload, ...state.workouts];
			})
			.addCase(createWorkout.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				state.emptyFields = action.payload.emptyFields;
			})
			.addCase(updateWorkout.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(updateWorkout.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log(action.payload);
				const {
					arg: { id },
				} = action.meta;
				if (id) {
					state.workouts = state.workouts.map((item) =>
						item._id === id ? action.payload : item
					);
				}
			})
			.addCase(updateWorkout.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				// state.emptyFields = action.payload.emptyFields;
			});
	},
});

// default export
export default workoutsSlice.reducer;

// selectors
export const selectAllWorkouts = (state) => state.workouts.workouts;
export const selectWorkoutStatus = (state) => state.workouts.status;
export const selectWorkoutError = (state) => state.workouts.error;
export const selectWorkoutFields = (state) => state.workouts.emptyFields;
