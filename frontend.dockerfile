FROM nginx:alpine as frontend
WORKDIR /
# NPM + NODE
RUN apk add nodejs
RUN apk add npm
# IONIC
RUN npm install -g cordova
RUN npm i -g @ionic/cli
# CONFIG FRONTEND
RUN mkdir /app
COPY newza-frontend /app
EXPOSE 8100
CMD cd /app && npm install && ionic serve --external 
