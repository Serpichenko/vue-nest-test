FROM node:18-alpine as build

WORKDIR /app-frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

COPY .env.example .env

RUN npm run build

FROM nginx:1.17.1-alpine

# Copy config nginx
COPY --from=build /app-frontend/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets from builder stage
COPY --from=build /app-frontend/dist /usr/share/nginx/html

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]