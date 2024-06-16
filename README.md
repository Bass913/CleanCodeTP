# Etapes avant de démarrer le projet

# Ajoutez les variables d'environnements nécessaires au projet
# Créer un fichier .env dans le dossier backend

cd backend

touch .env

# Ajoutez les variables suivantes :

PORT=8080
DB_NOSQL_HOST=mongodb+srv://wtresgi:e2b9aML@cluster0.tltlzuu.mongodb.net/cleancode?retryWrites=true&w=majority

# Rendez-vous dans le dossier front et installez les dépendences du projet

cd front

npm install

# Rendez-vous dans le dossier backend et installez les dépendences du projet

cd backend

npm install

# Lancez le serveur

npm run dev

# Lancez le front

cd ../front

npm run dev





