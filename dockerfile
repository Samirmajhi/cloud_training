# Use the official Node.js 16 (LTS) image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port that your Express application listens on (change it to your application's port)
EXPOSE 3000

# Start the Node.js application
CMD ["node", "app.js"]