import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	signupUser,
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

	useEffect(() => {
		if (signupStatus === "loading") {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [signupStatus]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(signupUser({ email, password }));
	};

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
			<div className="img-container">
				<img
					src="https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
					alt="Photocredit to Karsten Winegeart on Unsplash"
				></img>
			</div>
		</form>
	);
};

export default Signup;
