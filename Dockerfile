FROM node:16.14.0-alpine

RUN mkdir web-molino-de-barranco

WORKDIR web-molino-de-barranco

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
