import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		try {
			await register(email, password);
			setSuccess("Compte créé. Tu peux maintenant te connecter.");
			setTimeout(() => navigate("/login"), 700);
		} catch (err) {
			setError(err.message || "Inscription impossible");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="page page--narrow">
			<div className="page__hero page__hero--compact">
				<p className="eyebrow">Commencer ici</p>
				<h1>Inscription</h1>
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
				{success ? <p className="form-success">{success}</p> : null}

				<button type="submit" className="button button--primary" disabled={loading}>
					{loading ? "Création..." : "Créer mon compte"}
				</button>

				<p className="form-note">
					Déjà inscrit ? <Link to="/login">Se connecter</Link>
				</p>
			</form>
		</section>
	);
}
