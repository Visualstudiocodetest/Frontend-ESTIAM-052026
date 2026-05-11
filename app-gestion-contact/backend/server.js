require('dotenv').config();


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const express = require('express');

const app = express();

const cors = require('cors');

const JWT_SECRET = process.env.JWT_SECRET || "test";


const port = process.env.PORT || 3000;

const users = []

bcrypt.hash('password1234', 10)
    .then(hash => {
        users.push({ email: 'admin@gmail.com', passwordHash: hash });
    })
    .catch(err => console.error('Error hashing password:', err));

// Middleware d'authentification JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide' });
        req.user = user;
        next();
    });
}



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

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });
    bcrypt.compare(password, user.passwordHash)
        .then(match => {
            if (!match) return res.status(400).json({ error: 'Mot de passe incorrect' });
            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        })
        .catch(err => res.status(500).json({ error: 'Erreur serveur ' + err.message }));     });


app.get('/contacts', authenticateToken, (req, res) => {
    res.json(contacts);
});

app.post('/contacts', authenticateToken, (req, res) => {
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



app.delete('/contacts/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

app.put('/contacts/:id', authenticateToken, (req, res) => {
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
