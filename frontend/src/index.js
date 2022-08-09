// modules
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// styling
import "./index.css";

// components
import App from "./App";

// store
import store from "./redux/store";

// get data from server
import { fetchWorkouts } from "./redux/features/workoutsSlice";
store.dispatch(fetchWorkouts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
