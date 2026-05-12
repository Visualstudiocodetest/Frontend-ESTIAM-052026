
require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || "test";

const port = process.env.PORT || 3000;

const users = [];

bcrypt.hash('password1234', 10)
    .then(hash => {
        users.push({ email: 'user@example.com', password: hash });
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

const todos = [
    { id: 1, title: 'Faire les courses', completed: false },
    { id: 2, title: 'Appeler le médecin', completed: true },
];

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });
    bcrypt.compare(password, user.password)
        .then(match => {
            if (!match) return res.status(400).json({ error: 'Mot de passe incorrect' });
            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        })
        .catch(err => {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ error: 'Erreur interne' });
        });
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }
    bcrypt.hash(password, 10)
        .then(hash => {
            users.push({ email, password: hash });
            res.status(201).json({ message: 'Utilisateur créé' });
        })
        .catch(err => {
            console.error('Error hashing password:', err);
            res.status(500).json({ error: 'Erreur interne' });
        });
});

app.get('/todos', authenticateToken, (req, res) => {
    res.json(todos);
});

app.post('/todos', authenticateToken, (req, res) => {
    const { title } = req.body;
    const newTodo = { id: todos.length + 1, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return res.status(404).json({ error: 'Todo non trouvé' });
    todos.splice(index, 1);
    res.status(204).send();
});

app.patch('/todos/:id/toggle', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return res.status(404).json({ error: 'Todo non trouvé' });
    todos[index].completed = !todos[index].completed;
    res.json(todos[index]);
});

app.put('/todos/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return res.status(404).json({ error: 'Todo non trouvé' });
    todos[index] = { ...todos[index], title, completed };
    res.json(todos[index]);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});