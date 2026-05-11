import {Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  }

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  }
  const updateContact = (id, updatedContact) => {
    setContacts(contacts.map(c => c.id === id ? {...c, ...updatedContact} : c));
  }

  

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
