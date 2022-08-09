// ---------------------------------------------
// Modules
// ---------------------------------------------
import { combineReducers } from "redux";

// ---------------------------------------------
// Reducers
// ---------------------------------------------
import workoutsReducer from "./features/workoutsSlice";

// ---------------------------------------------
// Root Reducer
// ---------------------------------------------
const rootReducer = combineReducers({
	workouts: workoutsReducer,
});

export default rootReducer;
