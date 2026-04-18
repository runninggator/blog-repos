FROM node:24-bookworm-slim AS build
WORKDIR /usr/app
COPY src/ src/
COPY . .
RUN apt-get update -y && apt-get install -y openssl
RUN npm install
RUN npm run build
ENV NODE_ENV="production"
CMD ["sh", "-c", "node built/app.js"]