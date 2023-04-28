FROM node:18-alpine3.16


# Install necessary dependencies
RUN apk update && \
    apk add --no-cache \
        build-base \
        nodejs \
        npm \
        openjdk11 \
        python3 \
        py3-pip  
RUN apk add --no-cache mono --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing && \
    apk add --no-cache --virtual=.build-dependencies ca-certificates && \
    cert-sync /etc/ssl/certs/ca-certificates.crt && \
    apk del .build-dependencies

# Install Python dependencies
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm install

CMD ["npm", "start"]
