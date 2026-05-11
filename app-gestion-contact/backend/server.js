const express = require('express');

const app = express();

const cors = require('cors');



const port = process.env.PORT || 3000;

const contacts = [
    { id: 1, name: 'Doe', firstname: 'John', email: 'alexandre.rey@estiam.com', phone: '1234567890' },
    { id: 2, name: 'Smith', firstname: 'Jane', email: 'jane.smith@estiam.com', phone: '0987654321' },
];

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/contacts', (req, res) => {
    res.json(contacts);
});

app.post('/contacts', (req, res) => {
    const { name, firstname, email, phone } = req.body;
    if (!name || !firstname || !email) {
        return res.status(400).json({ error: 'Champs requis manquants (nom, prénom, email)' });
    }
    // validation email simple
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "L'email n'est pas valide" });
    }
    const newContact = { ...req.body, id: Date.now() };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

app.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts[index] = { ...contacts[index], ...req.body };
        res.json(contacts[index]);
    }
    else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

app.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

app.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts[index] = { ...contacts[index], ...req.body };
        res.json(contacts[index]);
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
