import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	login,
	selectLoginError,
	selectLoginStatus,
} from "../redux/features/userSlice";

const Login = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const loginStatus = useSelector(selectLoginStatus);
	const loginError = useSelector(selectLoginError);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await dispatch(login({ email, password }));
	};

	useEffect(() => {
		if (loginStatus === "loading") {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [loginStatus]);

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
			{loginError && <div className="error">{loginError}</div>}
		</form>
	);
};

export default Login;
