FROM node:slim

# Declaring env
# ENV NODE_ENV development

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project
COPY package.json .
COPY package-lock.json .

# Installing dependencies
RUN npm install

COPY . .

# Starting our application
CMD [ "node", "app.js" ]

# Exposing server port
EXPOSE 5000
