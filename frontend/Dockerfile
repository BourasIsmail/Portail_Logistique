# Stage 1 - Build
FROM node:22 AS build

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage (serve with a lightweight server)
FROM nginx:alpine

COPY --from=build /frontend/dist /usr/share/nginx/html

# Expose port 80 for HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]