FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./


# Bundle app source
COPY src ./src
COPY keystore ./keystore
COPY tsconfig.json tsconfig.json


RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]