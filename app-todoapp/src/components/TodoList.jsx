import TodoItem from './TodoItem';

function TodoList( {tasks, toggleTask, deleteTask} ) {
    return (
        <div>
            <h1>Ma liste de tâches</h1>

            <ul>
                {tasks.map((task) => (
                    <TodoItem 
                        key={task.id} 
                        task={task} 
                        toggleTask={toggleTask} 
                        deleteTask={deleteTask} 
                    />
                ))}
            </ul>

        </div>
    )
}

export default TodoList;