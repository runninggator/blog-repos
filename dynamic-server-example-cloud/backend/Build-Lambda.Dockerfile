FROM public.ecr.aws/lambda/nodejs:22 AS build
WORKDIR /usr/app
COPY src/ src/
COPY *.mjs *.json *.ts *.pem *.env .
RUN npm install
RUN npm run build
ENV NODE_ENV="production"
RUN rm -rf node_modules
RUN npm install --production
# Remove libraries that are not needed for the Lambda runtime
RUN rm -rf node_modules/@aws-sdk
RUN mv node_modules built/node_modules
RUN mv package.json built/package.json

FROM scratch
COPY --from=build /usr/app/built/ ./