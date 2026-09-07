FROM node:18-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
