import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { api } from "../lib/api";

export default function CreateArticle() {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		try {
			const article = await api.post("/articles", { title, content });
			navigate(`/articles/${article.id}`);
		} catch (err) {
			setError(err.message || "Création impossible");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="page page--narrow">
			<div className="page__hero page__hero--compact">
				<p className="eyebrow">Nouveau contenu</p>
				<h1>Créer un article</h1>
			</div>

			<ArticleForm
				title={title}
				content={content}
				onTitleChange={setTitle}
				onContentChange={setContent}
				onSubmit={handleSubmit}
				submitLabel="Publier"
				loading={loading}
				error={error}
			/>
		</section>
	);
}
