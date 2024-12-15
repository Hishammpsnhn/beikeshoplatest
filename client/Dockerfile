# FROM node:alpine 

# WORKDIR /app

# # COPY package*.json .
# COPY public/ /app/public
# COPY src/ /app/src
# COPY .env/ /app/.env
# COPY package.json .
# COPY package-lock.json /app/

# RUN npm install
# # COPY . .

# EXPOSE 3000
# CMD [ "npm", "start"]

FROM nginx:stable-alpine

COPY build /usr/share/nginx/html

