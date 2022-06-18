FROM node:gallium

USER root

# Create app directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./

RUN npm install

# Prevent EACCESS errors
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Bundle app source
COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]