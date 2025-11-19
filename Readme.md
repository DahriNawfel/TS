## Projet TS


## Description
Application simple de gestion de tâches développée en TypeScript.



## Installation
1. Cloner le dépôt : `git clone <repository_url>`
2. Naviguer dans le répertoire du projet : `cd project-directory`
3. Installer les dépendances : `npm install`
4. Compiler le projet : `npx tsc`


## Fonctionnalités
- Ajouter une tâche
- Supprimer une tâche
- Marquer une tâche comme terminée
- Afficher la liste des tâches
- test unitaire avec npm run test

## Utilisation
1. Démarrer l'application : `node dist/index.js`
2. `node dist/index.js add <titre> [description]` pour ajouter une tâche
3. `node dist/index.js list [filtre]` pour lister les tâches
4. `node dist/index.js delete <id>` pour supprimer une tâche
5. `node dist/index.js modify <id> [titre] [description] [status]` pour modifier une tâche

## utilisation via npm
1. `npm install -g royalnaw-ts_project`
2. `task-manager <parametre>`


