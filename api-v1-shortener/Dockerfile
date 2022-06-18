FROM node:gallium

# App directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./

RUN npm install

# install globaly nodemon
RUN npm install -g nodemon

# Prevent EACCESS errors
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Bundle app source
COPY . .

EXPOSE 20000

# start app
CMD [ "npm","start" ]
