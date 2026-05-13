import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

function formatDate(value) {
	return new Date(value).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}

export default function ArticleDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadArticle() {
			try {
				const data = await api.get(`/articles/${id}`);
				if (active) {
					setArticle(data);
				}
			} catch (err) {
				if (active) {
					setError(err.message || "Article introuvable");
				}
			} finally {
				if (active) {
					setLoading(false);
				}
			}
		}

		loadArticle();

		return () => {
			active = false;
		};
	}, [id]);

	const handleDelete = async () => {
		try {
			await api.delete(`/articles/${id}`);
			navigate("/");
		} catch (err) {
			setError(err.message || "Suppression impossible");
		}
	};

	const canManage = user?.email && article?.author === user.email;

	if (loading) {
		return <p className="status">Chargement de l'article...</p>;
	}

	if (error) {
		return <p className="status status--error">{error}</p>;
	}

	if (!article) {
		return <p className="status">Article introuvable.</p>;
	}

	return (
		<section className="page page--narrow">
			<article className="detail-card">
				<p className="article-card__meta">
					Par {article.author} · {formatDate(article.createdAt)}
				</p>
				<h1>{article.title}</h1>
				<p className="detail-card__content">{article.content || article.description}</p>

				{canManage ? (
					<div className="detail-card__actions">
						<Link to={`/articles/${article.id}/edit`} className="button">
							Modifier
						</Link>
						<button type="button" className="button button--danger" onClick={handleDelete}>
							Supprimer
						</button>
					</div>
				) : null}
			</article>
		</section>
	);
}
