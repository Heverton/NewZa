FROM nginx:alpine as newza-frontend
WORKDIR /
# NPM + NODE
RUN apk add nodejs
RUN apk add npm
# IONIC
RUN npm install -g cordova
RUN npm i -g @ionic/cli
# CONFIG FRONTEND
RUN mkdir /newza-frontend
COPY * /newza-frontend
EXPOSE 8100
CMD cd /newza-frontend && npm install && ionic serve --external 
