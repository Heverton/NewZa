FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g ionic@5.0.0
RUN npm install && mv node_modules ../
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]
