import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		try {
			await login(email, password);
			navigate("/");
		} catch (err) {
			setError(err.message || "Connexion impossible");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="page page--narrow">
			<div className="page__hero page__hero--compact">
				<p className="eyebrow">Bon retour</p>
				<h1>Connexion</h1>
			</div>

			<form className="form-card" onSubmit={handleSubmit}>
				<label className="field">
					<span>Email</span>
					<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
				</label>

				<label className="field">
					<span>Mot de passe</span>
					<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
				</label>

				{error ? <p className="form-error">{error}</p> : null}

				<button type="submit" className="button button--primary" disabled={loading}>
					{loading ? "Connexion..." : "Se connecter"}
				</button>

				<p className="form-note">
					Pas encore de compte ? <Link to="/register">Créer un compte</Link>
				</p>
			</form>
		</section>
	);
}
