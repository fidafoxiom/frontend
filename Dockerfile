# Step 1: Build stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the React app using Vite
RUN npm run build

# Step 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the Vite build from the previous build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
