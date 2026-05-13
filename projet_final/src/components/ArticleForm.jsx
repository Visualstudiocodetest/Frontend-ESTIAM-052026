export default function ArticleForm({
	title,
	content,
	onTitleChange,
	onContentChange,
	onSubmit,
	submitLabel,
	loading = false,
	error = ""
}) {
	return (
		<form className="form-card" onSubmit={onSubmit}>
			<label className="field">
				<span>Titre</span>
				<input
					type="text"
					value={title}
					onChange={(event) => onTitleChange(event.target.value)}
					placeholder="Titre de l'article"
					required
				/>
			</label>

			<label className="field">
				<span>Contenu</span>
				<textarea
					rows="10"
					value={content}
					onChange={(event) => onContentChange(event.target.value)}
					placeholder="Décris ton article"
					required
				/>
			</label>

			{error ? <p className="form-error">{error}</p> : null}

			<button type="submit" className="button button--primary" disabled={loading}>
				{loading ? "En cours..." : submitLabel}
			</button>
		</form>
	);
}
