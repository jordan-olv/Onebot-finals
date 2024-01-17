# Partir d'une image de base compatible avec Bun, comme une image Ubuntu
FROM ubuntu:latest

# Installer Bun
RUN apt-get update && apt-get install -y curl unzip && \
    curl https://bun.sh/install | bash

# Ajouter Bun au PATH
ENV PATH="/root/.bun/bin:$PATH"

# Créer un répertoire de travail dans le conteneur
WORKDIR /usr/src/bot

# Copier les fichiers de projet dans le conteneur
COPY . .

# Installer les dépendances
RUN bun install

# Compiler le code TypeScript
RUN bun run build

# Définir la commande pour exécuter le bot
CMD ["bun", "start"]
