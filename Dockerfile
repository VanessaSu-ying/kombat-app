FROM node:21-alpine3.19

WORKDIR /app


COPY package.json ./
COPY package-lock.json ./


RUN npm install

COPY . .

RUN npm run build


CMD [ "npm", "run", "start" ]
