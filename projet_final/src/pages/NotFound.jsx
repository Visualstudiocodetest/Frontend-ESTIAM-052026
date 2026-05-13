import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<section className="page page--narrow page--centered">
			<p className="eyebrow">404</p>
			<h1>Page introuvable</h1>
			<p className="lead">La route demandée n'existe pas.</p>
			<Link to="/" className="button button--primary">
				Retour à l'accueil
			</Link>
		</section>
	);
}
