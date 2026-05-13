# Frontend ESTIAM - Structure du depot

## Structure du depot

Ce depot regroupe plusieurs projets React (Vite) realises pendant la formation.

```text
COURS_FrontEnd/
|
|- app-estiam-front/
|  |- Exemples de composants React (Bonjour, Bouton, Formulaire, Listes, etc.)
|
|- app-gestion-contact/
|  |- Application CRUD de gestion de contacts
|
|- app-todoapp/
|  |- Application de gestion de taches (todo list)
|
|- projet_final/
|  |- Projet final: authentification + gestion d'articles + backend Node.js
```

## Detail des applications

### [app-estiam-front](app-estiam-front/)
Application de demonstration de composants React de base:
- Titres
- Listes
- Formulaires
- Gestion d'evenements

### [app-gestion-contact](app-gestion-contact/)
Application pour gerer une liste de contacts:
- Ajouter un contact
- Modifier un contact
- Supprimer un contact
- Rechercher un contact

### [app-todoapp](app-todoapp/)
Application simple de gestion de taches (todo list):
- Ajouter une tache
- Supprimer une tache
- Afficher la liste des taches

### [projet_final](projet_final/)
Application complete avec frontend React et backend Node.js:
- Inscription / connexion utilisateur
- Protection de routes avec token JWT
- Liste publique d'articles
- Creation, modification et suppression d'articles
- Filtrage des articles de l'utilisateur connecte

## Notes

- Chaque dossier d'application contient son propre `package.json`.
- Pour lancer un projet, place-toi dans le dossier cible puis execute `npm install` et `npm run dev`.
