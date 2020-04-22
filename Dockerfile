FROM node:12.13.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

VOLUME [ "/usr/src/app/sites" ]

VOLUME [ "/usr/src/app/public" ]

CMD [ "npm", "start" ]