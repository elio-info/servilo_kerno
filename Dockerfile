# Pull the Node.js Docker image:
FROM node:22.12

# trabajando en directorio de trabajo
WORKDIR /app

# copio la carpeta
COPY package.json . 

# instalar:
run npm install 

COPY ./dist ./src

#correr
CMD ["node","src/main.js"]