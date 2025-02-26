# Use a specific Node.js version
FROM node:18.17.0-alpine3.17

# Create and set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --no-audit --progress=false

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Define environment variables
ENV HOST=0.0.0.0
ENV NEXT_PUBLIC_BASE_URL=/market/

# Run the application
CMD ["npm", "run", "start"]
