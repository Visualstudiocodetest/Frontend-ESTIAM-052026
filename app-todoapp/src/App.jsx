import {Routes, Route, Link} from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  }
  return (
    <div className="App">
      <nav>
        <Link to="/addTask">Ajouter une tâche</Link>
        <Link to="/tasks">Liste des tâches</Link>
      </nav>

      <Routes>
        <Route path="/addTask" element={<TodoForm addTask={addTask} />} />
        <Route path="/Tasks" element={<TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />} />
      </Routes>
    </div>
  )

}

export default App;