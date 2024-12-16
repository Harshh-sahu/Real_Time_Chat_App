# Stage 1: Build the Node.js application
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# Copy the built app to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
