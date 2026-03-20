# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent 

# copier tout le projet
COPY . .

# exposer le port react
EXPOSE 3000

# lancer l'application
CMD ["npm", "start"]