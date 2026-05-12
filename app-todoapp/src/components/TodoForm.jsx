import { useState } from 'react'

function TodoForm({ onAdd }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title: e.target[0].value, completed: false };
        onAdd(newTask);
        e.target[0].value = '';
    };
    return (
        <div>
            <h1>Ajouter une tâche</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Entrez une nouvelle tâche..." required />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
}

export default TodoForm;