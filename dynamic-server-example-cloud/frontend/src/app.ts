import express from "express";
import * as https from "node:https";
import { readFileSync } from "node:fs";

const staticApp = express();

staticApp.use(express.static("built/public"));

const options = {
  key: readFileSync("./www.jimmy-localhost.com-key.pem"),
  cert: readFileSync("./www.jimmy-localhost.com.pem"),
};

https.createServer(options, staticApp).listen(3001, () => {
  console.log(
    "Static server is running on https://www.jimmy-localhost.com:3001",
  );
});
