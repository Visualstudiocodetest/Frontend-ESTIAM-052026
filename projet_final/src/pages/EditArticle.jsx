import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function EditArticle() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadArticle() {
			try {
				const article = await api.get(`/articles/${id}`);
				if (!article) {
					throw new Error("Article introuvable");
				}
				if (article.author !== user?.email) {
					throw new Error("Vous n'êtes pas autorisé à modifier cet article");
				}
				if (active) {
					setTitle(article.title || "");
					setContent(article.content || article.description || "");
				}
			} catch (err) {
				if (active) {
					setError(err.message || "Chargement impossible");
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
	}, [id, user?.email]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSaving(true);
		setError("");

		try {
			await api.put(`/articles/${id}`, { title, content });
			navigate(`/articles/${id}`);
		} catch (err) {
			setError(err.message || "Modification impossible");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return <p className="status">Chargement de l'article...</p>;
	}

	return (
		<section className="page page--narrow">
			<div className="page__hero page__hero--compact">
				<p className="eyebrow">Édition</p>
				<h1>Modifier l'article</h1>
			</div>

			{error ? <p className="status status--error">{error}</p> : null}

			{!error ? (
				<ArticleForm
					title={title}
					content={content}
					onTitleChange={setTitle}
					onContentChange={setContent}
					onSubmit={handleSubmit}
					submitLabel="Enregistrer"
					loading={saving}
				/>
			) : null}
		</section>
	);
}
