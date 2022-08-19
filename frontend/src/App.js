import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./redux/features/userSlice";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { fetchWorkouts } from "./redux/features/workoutsSlice";

function App() {
	const user = useSelector(selectUser);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route
							path="/"
							element={user ? <Home /> : <Navigate to="/login" />}
						/>
						<Route
							path="/login"
							element={!user ? <Login /> : <Navigate to="/" />}
						/>
						<Route
							path="/signup"
							element={!user ? <Signup /> : <Navigate to="/" />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
