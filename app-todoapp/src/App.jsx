import {Routes, Route, Link} from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import { useAuth, AuthProvider} from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { api } from './lib/api';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';


function App() {
  const [tasks, setTasks] = useState([]);

  const { user, logout } = useAuth();

  const addTask = (newTask) => {
    api.post('/todos', newTask)
      .then(createdTask => {
        setTasks([...tasks, createdTask]);
      })
      .catch(err => {
        alert("Failed to add task: " + err.message);
      });
  }
  const toggleTask = (id) => {
    api.patch(`/todos/${id}/toggle`)
      .then(updatedTask => {
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      })
      .catch(err => {
        alert("Failed to toggle task: " + err.message);
      });
  }
  const deleteTask = (id) => {
    api.delete(`/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(err => {
        alert("Failed to delete task: " + err.message);
      });
  }

  useEffect(() => {
    api.get('/todos')
      .then(fetchedTasks => {
        setTasks(fetchedTasks);
      })
      .catch(err => {
        alert("Failed to fetch tasks: " + err.message);
      });
  }, []);
  
  return (
    <div className="App">
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5', padding: '1rem'}}>
        <div>
          <b>Todo App</b>
        </div>
      </header>
      <nav style={{margin: '1rem 0'}}>
        <Link to="/" style={{marginRight: '1rem'}}>Home</Link>
        <Link to="/addTask">Add Task</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/register">Register</Link>
      </nav>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </ProtectedRoute>
        } />
        <Route path="/addTask" element={
          <ProtectedRoute>
            <TodoForm onAdd={addTask} />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
          <Route path="/logout" element={
            <ProtectedRoute>
              <button onClick={() => {
                logout();
                navigate('/login');
                }
              }>Logout</button>
            </ProtectedRoute>
          } />
        
        
      </Routes>
    </div>
  );
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;      

}

export default App;