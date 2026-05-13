import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header className="topbar">
			<Link to="/" className="brand-link">The blog</Link>

			<nav className="topbar__nav" aria-label="Main navigation">
				<NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
					Accueil
				</NavLink>
				{user ? (
					<>
						<NavLink to="/create" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
							Créer
						</NavLink>
						<NavLink to="/my-articles" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
							Mes posts
						</NavLink>
						<button type="button" className="nav-button" onClick={handleLogout}>
							Logout
						</button>
					</>
				) : (
					<>
						<NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
							Login
						</NavLink>
						<NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
							Sign up
						</NavLink>
					</>
				)}
			</nav>
		</header>
	);
}
