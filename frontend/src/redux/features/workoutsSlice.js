// modules
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// initial state
const initialState = {
	workouts: [],
	fetchStatus: "idle",
	fetchError: null,
	deleteStatus: "idle",
	deleteError: null,
	createFormStatus: "idle",
	createFormError: null,
	createFormEmptyFields: [],
	updateWorkoutStatus: "idle",
	editableWorkouts: [],
	erroredWorkouts: [],
};

// async functions - thunks
export const fetchWorkouts = createAsyncThunk(
	"workouts/fetchWorkouts",
	async (user, { rejectWithValue }) => {
		const response = await fetch("/api/workouts", {
			headers: { Authorization: `Bearer ${user.token}` },
		});
		const json = await response.json();

		if (!response.ok) {
			return rejectWithValue(json);
		}
		if (response.ok) {
			return json;
		}
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
		const json = await response.json();

		if (!response.ok) {
			return rejectWithValue(json);
		}
		if (response.ok) {
			return json;
		}
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
		const json = await response.json();

		if (!response.ok) {
			return rejectWithValue(json);
		}
		if (response.ok) {
			return json;
		}
	}
);

// slice
const workoutsSlice = createSlice({
	name: "workouts",
	initialState,
	reducers: {
		openForm: (state, action) => {
			state.editableWorkouts.push(action.payload._id);
		},
		closeForm: (state, action) => {
			const { id } = action.payload;

			state.editableWorkouts = state.editableWorkouts.filter(
				(editableId) => {
					return editableId !== id;
				}
			);
			state.erroredWorkouts = state.erroredWorkouts.filter((errored) => {
				return errored.id !== id;
			});
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchWorkouts.pending, (state, action) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchWorkouts.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.workouts = action.payload;
			})
			.addCase(fetchWorkouts.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.fetchError = action.error.message;
			})
			.addCase(deleteWorkout.pending, (state, action) => {
				state.deleteStatus = "loading";
			})
			.addCase(deleteWorkout.fulfilled, (state, action) => {
				state.deleteStatus = "succeeded";
				state.workouts = state.workouts.filter((workout) => {
					return workout._id !== action.payload._id;
				});
			})
			.addCase(deleteWorkout.rejected, (state, action) => {
				state.deleteStatus = "failed";
				state.deleteError = action.error.message;
			})
			.addCase(createWorkout.pending, (state, action) => {
				state.createFormStatus = "loading";

				// clear error when pending
				state.createFormError = null;
				state.createFormEmptyFields = [];
			})
			.addCase(createWorkout.fulfilled, (state, action) => {
				state.createFormStatus = "succeeded";
				state.workouts = [action.payload, ...state.workouts];
			})
			.addCase(createWorkout.rejected, (state, action) => {
				state.createFormStatus = "failed";
				state.createFormEmptyFields = action.payload.emptyFields;
				state.createFormError = action.payload.error;
			})
			.addCase(updateWorkout.pending, (state, action) => {
				state.updateWorkoutStatus = "loading";
			})
			.addCase(updateWorkout.fulfilled, (state, action) => {
				state.updateWorkoutStatus = "succeeded";

				const { _id } = action.payload;

				// add to workouts
				state.workouts = state.workouts.map((workout) =>
					workout._id === _id ? action.payload : workout
				);

				// remove from editableWorkouts
				state.editableWorkouts = state.editableWorkouts.filter(
					(workout) => workout !== _id
				);

				// remove from erroredWorkouts
				state.erroredWorkouts = state.erroredWorkouts.filter(
					(workout) => workout.id !== _id
				);
			})
			.addCase(updateWorkout.rejected, (state, action) => {
				state.updateWorkoutStatus = "failed";

				const { id, emptyFields, title, load, reps, error } =
					action.payload;

				let pendingFields = { title, load, reps };

				if (!title) {
					delete pendingFields.title;
				}
				if (!load) {
					delete pendingFields.load;
				}
				if (!reps) {
					delete pendingFields.reps;
				}

				// if it exists then update it, otherwise add it
				if (
					state.erroredWorkouts.some((workout) => workout.id === id)
				) {
					state.erroredWorkouts = state.erroredWorkouts.map(
						(workout) =>
							workout.id === id
								? {
										id,
										error,
										pendingFields,
										emptyFields,
								  }
								: workout
					);
				} else {
					state.erroredWorkouts.push({
						id,
						error,
						pendingFields,
						emptyFields,
					});
				}
			});
	},
});

// default export
export default workoutsSlice.reducer;

// actions
export const { openForm, closeForm } = workoutsSlice.actions;

// fetch selectors
export const selectAllWorkouts = (state) => state.workouts.workouts;
export const selectFetchStatus = (state) => state.workouts.fetchStatus;
export const selectFetchError = (state) => state.workouts.fetchError;

// create form selectors
export const selectCreateFormEmptyFields = (state) =>
	state.workouts.createFormEmptyFields;
export const selectCreateFormError = (state) => state.workouts.createFormError;
export const selectCreateFormStatus = (state) =>
	state.workouts.createFormStatus;

// edit form selectors
export const selectEditableWorkouts = (state) =>
	state.workouts.editableWorkouts;
export const selectErroredWorkouts = (state) => state.workouts.erroredWorkouts;
