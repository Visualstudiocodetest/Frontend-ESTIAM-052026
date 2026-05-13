import { Link } from "react-router-dom";

function formatDate(value) {
	if (!value) return "Date inconnue";
	return new Date(value).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}

export default function ArticleCard({ article, showActions = false, onDelete }) {
	const content = article.content || article.description || "";

	return (
		<article className="article-card">
			<div className="article-card__content">
				<p className="article-card__meta">
					Par {article.author} · {formatDate(article.createdAt)}
				</p>
				<h3>{article.title}</h3>
				<p className="article-card__excerpt">{content}</p>
			</div>

			<div className="article-card__actions">
				<Link to={`/articles/${article.id}`} className="button button--ghost">
					Voir
				</Link>
				{showActions ? (
					<>
						<Link to={`/articles/${article.id}/edit`} className="button">
							Modifier
						</Link>
						<button type="button" className="button button--danger" onClick={() => onDelete?.(article.id)}>
							Supprimer
						</button>
					</>
				) : null}
			</div>
		</article>
	);
}
