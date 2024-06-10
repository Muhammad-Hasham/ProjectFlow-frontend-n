# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000 for accessing the application
EXPOSE 3001

# Command to start the application
CMD ["npm", "start"]
