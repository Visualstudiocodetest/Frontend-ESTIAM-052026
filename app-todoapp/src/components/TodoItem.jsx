function TodoItem({ task, toggleTask, deleteTask }) {
    return (
        <div className={`todo-item-container ${task.completed ? 'completed-task' : ''}`}>
            <h1>{task.title}</h1>

            <div className="todo-item-actions">
                <button className="btn-outline" onClick={() => toggleTask(task.id)}>
                    {task.completed ? "Annuler" : "Terminer"}
                </button>

                <button onClick={() => deleteTask(task.id)}>
                    Supprimer
                </button>
            </div>
        </div>
    )
}

export default TodoItem;