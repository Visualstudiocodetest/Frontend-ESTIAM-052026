
require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || "test";

const port = process.env.PORT || 3000;

const users = [];
let nextArticleId = 2;

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

const articles = [
    {
        id: 1,
        title: 'Article 1',
        content: 'Description de l\'article 1',
        description: 'Description de l\'article 1',
        author: 'user@example.com',
        createdAt: new Date('2024-01-01')
    },
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
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
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

app.get('/articles', (req, res) => {
    res.json(articles);
});

app.get('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const article = articles.find(item => item.id === id);
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(article);
});

app.post('/articles', authenticateToken, (req, res) => {
    const { title, content, description } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Titre et contenu requis' });
    }
    const newArticle = {
        id: nextArticleId++,
        title,
        content,
        description: description || content,
        author: req.user.email,
        createdAt: new Date()
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

app.delete('/articles/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = articles.findIndex(article => article.id === id);
    if (index === -1) return res.status(404).json({ error: 'Article non trouvé' });
    if (articles[index].author !== req.user.email) {
        return res.status(403).json({ error: 'Action non autorisée' });
    }
    articles.splice(index, 1);
    res.status(204).send();
});

app.put('/articles/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content, description } = req.body;
    const article = articles.find(article => article.id === id);
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    if (article.author !== req.user.email) {
        return res.status(403).json({ error: 'Action non autorisée' });
    }
    article.title = title || article.title;
    article.content = content || article.content;
    article.description = description || article.content;
    res.json(article);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});