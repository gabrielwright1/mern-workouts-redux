import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	signup,
	selectSignupError,
	selectSignupStatus,
} from "../redux/features/userSlice";

const Signup = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const signupError = useSelector(selectSignupError);
	const signupStatus = useSelector(selectSignupStatus);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await dispatch(signup({ email, password }));
	};

	useEffect(() => {
		if (signupStatus === "loading") {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [signupStatus]);

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign Up</h3>

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

			<button disabled={isLoading}>Sign up</button>
			{signupError && <div className="error">{signupError}</div>}
		</form>
	);
};

export default Signup;
