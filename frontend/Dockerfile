FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install esbuild@0.19.11 -D

CMD ["npm", "run", "dev"]