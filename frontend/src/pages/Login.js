import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loginUser,
	selectLoginError,
	selectLoginStatus,
} from "../redux/features/userSlice";
import sleep from "../utils/sleep";

const Login = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const loginStatus = useSelector(selectLoginStatus);
	const loginError = useSelector(selectLoginError);

	useEffect(() => {
		if (loginStatus !== "loading") {
			setIsLoading(false);
		}
	}, [loginStatus]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email && password) {
			setIsLoading(true);
			await sleep(800);
		}
		await dispatch(loginUser({ email, password }));
	};

	const handleGuestLogin = async () => {
		setEmail("guest@guest.ca");
		setPassword("Guest123#");
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h3>Log In</h3>

			<label>Email address:</label>
			<input
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<label>Password:</label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>

			<button disabled={isLoading}>Log in</button>
			<button
				className="guest-login"
				disabled={isLoading}
				onClick={handleGuestLogin}
			>
				Login as guest
			</button>
			{isLoading && <span className="loading">Loading</span>}

			{loginError && <div className="error">{loginError}</div>}
			<div className="img-container">
				<img
					src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
					alt="Photocredit to Karsten Winegeart on Unsplash"
				></img>
			</div>
		</form>
	);
};

export default Login;
