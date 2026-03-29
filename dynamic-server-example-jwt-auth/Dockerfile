FROM node:24-bookworm-slim AS build
WORKDIR /usr/app
COPY *.ts *.json *.pem ./
COPY public/ public/
RUN npm install
RUN npx tsc --outDir built
CMD ["node", "built/app.js"]