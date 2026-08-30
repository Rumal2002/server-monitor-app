# Stage 1: Build the React Application (Node 20 pawichi karanawa)
FROM node:20 AS build
WORKDIR /app

COPY . .
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm run build

# Stage 2: Serve the App using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
