FROM node:16.14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
