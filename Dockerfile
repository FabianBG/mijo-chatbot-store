FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

VOLUME [ "/usr/src/app/sites" ]

VOLUME [ "/usr/src/app/public" ]

CMD [ "npm", "start" ]