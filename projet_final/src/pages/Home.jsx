import { useEffect, useState } from "react";
import { api } from "../lib/api";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadArticles() {
			try {
				const data = await api.get("/articles");
				if (active) {
					setArticles(Array.isArray(data) ? data : []);
				}
			} catch (err) {
				if (active) {
					setError(err.message || "Impossible de charger les articles");
				}
			} finally {
				if (active) {
					setLoading(false);
				}
			}
		}

		loadArticles();

		return () => {
			active = false;
		};
	}, []);

	return (
		<section className="page">
			<div className="page__hero">
				<p className="eyebrow">Articles publics</p>
				<h1>Découvre les publications de la communauté</h1>
				<p className="lead">
					Consulte les articles, puis connecte-toi pour écrire, modifier ou supprimer tes propres posts.
				</p>
			</div>

			{loading ? <p className="status">Chargement des articles...</p> : null}
			{error ? <p className="status status--error">{error}</p> : null}

			<div className="articles-grid">
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>

			{!loading && !error && articles.length === 0 ? (
				<p className="status">Aucun article pour le moment.</p>
			) : null}
		</section>
	);
}
