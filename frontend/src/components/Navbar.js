import { Link } from "react-router-dom";
import { setLogout, selectUser } from "../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const handleClick = async () => {
		dispatch(setLogout());
	};

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>Workout Buddy</h1>
				</Link>
				<nav>
					{user && (
						<div>
							<span>{user.email}</span>
							<button onClick={handleClick}>Log out</button>
						</div>
					)}
					{!user && (
						<div>
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
