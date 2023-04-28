FROM node:18-alpine3.16


COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]