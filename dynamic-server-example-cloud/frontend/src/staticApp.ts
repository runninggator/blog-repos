import express from "express";
import https from "https";
import fs from "fs";

const staticApp = express();

staticApp.use(express.static("public"));

const options = {
  key: fs.readFileSync("./www.jimmy-localhost.com-key.pem"),
  cert: fs.readFileSync("./www.jimmy-localhost.com.pem"),
};

https.createServer(options, staticApp).listen(3001, () => {
  console.log(
    "Static server is running on https://www.jimmy-localhost.com:3001",
  );
});
