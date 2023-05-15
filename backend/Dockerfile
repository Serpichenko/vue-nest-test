FROM node:18-alpine as build

WORKDIR /app-backend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

COPY .env.example .env

RUN npm run build

ENTRYPOINT ["npm", "run", "start:prod"]