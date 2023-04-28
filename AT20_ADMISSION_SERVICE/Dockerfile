FROM node:18-alpine3.16

WORKDIR /app/ui

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]