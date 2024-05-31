# Use an official Node.js 16 image as the base image
FROM node:16-alpine

# Copy the rest of the application code to the working directory
COPY . .

# Set the working directory in the container
WORKDIR /my-app

# Copy package.json and package-lock.json (if available)
COPY my-app/package*.json ./

# Install dependencies
RUN npm cache clean --force \
    && npm install \
    && npm install --save-dev @babel/preset-react

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
