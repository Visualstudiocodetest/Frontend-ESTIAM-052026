import {Routes, Route, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import { api } from './lib/api';

function App() {
  const [contacts, setContacts] = useState([]);

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
    api.get('/contacts')
      .then(res => setContacts(res))
      .catch(err => console.error(err));
  }, []);


  return (
    <div className="App">
    <nav>
    <Link to="/addContact">Ajouter un contact</Link>
    <Link to="/">Liste des contacts</Link>
    </nav>


    <Routes>
      <Route path="/" element={<ContactList contacts={contacts} deleteContact={deleteContact} updateContact={updateContact} />} />
      <Route path="/addContact" element={<ContactForm addContact={addContact} />} />
    </Routes>
    </div>
  )
}

export default App
