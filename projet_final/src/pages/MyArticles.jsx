import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import ArticleCard from "../components/ArticleCard";

export default function MyArticles() {
	const { user } = useAuth();
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadArticles() {
			try {
				const data = await api.get("/articles");
				if (active) {
					setArticles((Array.isArray(data) ? data : []).filter((article) => article.author === user?.email));
				}
			} catch (err) {
				if (active) {
					setError(err.message || "Impossible de charger vos articles");
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
	}, [user?.email]);

	const handleDelete = async (articleId) => {
		try {
			await api.delete(`/articles/${articleId}`);
			setArticles((current) => current.filter((article) => article.id !== articleId));
		} catch (err) {
			setError(err.message || "Suppression impossible");
		}
	};

	return (
		<section className="page">
			<div className="page__hero page__hero--compact">
				<p className="eyebrow">Espace privé</p>
				<h1>Mes articles</h1>
			</div>

			{loading ? <p className="status">Chargement...</p> : null}
			{error ? <p className="status status--error">{error}</p> : null}

			<div className="articles-grid">
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} showActions onDelete={handleDelete} />
				))}
			</div>

			{!loading && !error && articles.length === 0 ? (
				<p className="status">Vous n'avez encore publié aucun article.</p>
			) : null}
		</section>
	);
}
