import { Link } from "react-router-dom";
import { logoutUser, selectUser } from "../redux/features/userSlice";
import { resetForms } from "../redux/features/workoutsSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const handleClick = async () => {
		dispatch(logoutUser());
		dispatch(resetForms());
	};

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>My Workout Planner</h1>
				</Link>
				<nav>
					{user && (
						<div className="user-options">
							<span>{user.email}</span>
							<button onClick={handleClick}>Log out</button>
						</div>
					)}
					{!user && (
						<div className="user-options">
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
