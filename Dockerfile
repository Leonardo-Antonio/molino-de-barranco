FROM node:16.14.0-alpine

RUN mkdir /home/node/web-molino-de-barranco

WORKDIR /home/node/web-molino-de-barranco

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000

RUN npm run start
