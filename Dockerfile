# Use official Playwright image with browsers
FROM mcr.microsoft.com/playwright:v1.45.1

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy test files into container
COPY . .

# Run Playwright tests when the container starts
CMD ["npx", "playwright", "test"]
