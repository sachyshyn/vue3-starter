# Use an official Node runtime as a parent image
FROM node:alpine as build-stage

# Set environment variables
ARG APP_API_URL

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from current directory to the working directory in the container
COPY . .

# Build the Vue.js application with environment variable API_BASE_URL
RUN npm run build

# Install 'serve' globally
RUN npm install -g serve

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run when the container starts
CMD ["serve", "-p", "8080", "-s", "dist"]
