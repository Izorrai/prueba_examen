FROM node:18-alpine

WORKDIR /app

# Copiamos package.json y db.json primero
COPY package.json db.json ./
RUN npm install

# Copiamos el resto de archivos (HTML, CSS, JS, imágenes…)
COPY . .

EXPOSE 3000

# Arrancamos json-server dentro del contenedor
CMD ["npm", "start"]

