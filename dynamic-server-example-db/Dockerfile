FROM node:24-bookworm-slim AS build
WORKDIR /usr/app
COPY *.ts *.json *.pem *.html *.vue *.env ./
COPY public/ public/
COPY prisma/ prisma/
RUN apt-get update -y && apt-get install -y openssl
RUN npm install
RUN npx tsc --outDir built
RUN npx vite build
CMD ["sh", "-c", "npx prisma migrate deploy && node built/app.js"]