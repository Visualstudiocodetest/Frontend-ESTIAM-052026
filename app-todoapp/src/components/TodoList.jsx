import TodoItem from './TodoItem';

function TodoList( {tasks, onToggle, onDelete} ) {
    return (
        <div>
            <h1>Ma liste de tâches</h1>

            <ul>
                {tasks.map((task) => (
                    <TodoItem 
                        key={task.id} 
                        task={task} 
                        toggleTask={onToggle} 
                        deleteTask={onDelete} 
                    />
                ))}
            </ul>

        </div>
    )
}

export default TodoList;