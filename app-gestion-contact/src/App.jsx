import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import { api } from './lib/api';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';


  function App() {
    const [contacts, setContacts] = useState([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const addContact = (newContact) => {
      api.post('/contacts', newContact)
        .then(res => setContacts([...contacts, res]))
        .catch(err => console.error(err));
    }

    const deleteContact = (id) => {
      api.delete(`/contacts/${id}`)
        .then(() => setContacts(contacts.filter(c => c.id !== id)))
        .catch(err => console.error(err));
    }
    const updateContact = (id, updatedContact) => {
      api.put(`/contacts/${id}`, updatedContact)
        .then(res => setContacts(contacts.map(c => c.id === id ? res : c)))
        .catch(err => console.error(err));
    }
    useEffect(() => {
      if (user) {
        api.get('/contacts')
          .then(res => setContacts(res))
          .catch(err => console.error(err));
      }
    }, [user]);

    return (
      <div className="App">
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5', padding: '1rem'}}>
          <div>
            <b>Gestion de contacts</b>
          </div>
          <div>
            {user ? (
              <>
                <span style={{marginRight: '1rem'}}>Connecté en tant que <b>{user.email || 'utilisateur'}</b></span>
                <button onClick={() => { logout(); navigate('/login'); }}>Se déconnecter</button>
              </>
            ) : (
              <Link to="/login">Se connecter</Link>
            )}
          </div>
        </header>
        <nav style={{margin: '1rem 0'}}>
          {user && <>
            <Link to="/addContact" style={{marginRight: '1rem'}}>Ajouter un contact</Link>
            <Link to="/">Liste des contacts</Link>
          </>}
        </nav>

        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <ContactList contacts={contacts} deleteContact={deleteContact} updateContact={updateContact} />
            </ProtectedRoute>
          } />
          <Route path="/addContact" element={
            <ProtectedRoute>
              <ContactForm addContact={addContact} />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }

export default App;
