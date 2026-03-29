FROM node:24-bookworm-slim AS build
WORKDIR /usr/app
# Updated this line
COPY *.ts *.json *.pem *.html *.vue ./
COPY public/ public/
RUN npm install
RUN npx tsc --outDir built
# Added this line
RUN npx vite build
CMD ["node", "built/app.js"]