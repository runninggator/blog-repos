import express from "express";
import * as jose from "jose";
import { prismaClient } from "./prismaClient.js";
import crypto from "crypto";

const serverlessExpress = require("@codegenie/serverless-express");
const dynamicApp = express();

dynamicApp.all("/{*splat}", (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://www.jimmy-localhost.com:3001",
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

dynamicApp.options("/{*splat}", (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "foo, Content-Type");
  res.sendStatus(204);
});

dynamicApp.get("/exampleEndpoint", (req, res) => {
  console.log(req.headers);
  res.header("Set-Cookie", [
    "basic_cookie=basic cookie value",
    "httpOnly_cookie=httpOnly cookie value; Domain=www.jimmy-localhost.com; Path=/exampleEndpoint; Secure; HttpOnly; Max-Age=3600",
  ]);
  res.send("Hello from the example endpoint!");
});

const secret = Buffer.from("webserver_secret_key");

dynamicApp.use(express.json());

dynamicApp.post("/login", async (req, res) => {
  const user = await prismaClient.user.findFirst({
    where: {
      name: req.body.username,
      hashedPwd: crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex"),
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const jwt = await new jose.SignJWT({ username: req.body.username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15 seconds")
    .sign(secret);
  res.json({ jwt });
});

dynamicApp.post("/createUser", async (req, res) => {
  const user = await prismaClient.user.create({
    data: {
      name: req.body.username,
      email: req.body.email,
      hashedPwd: crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex"),
    },
  });

  res.json({ user });
});

dynamicApp.post("/testJwt", async (req, res) => {
  const jwt = await jose.jwtVerify(req.body.jwt, secret, {});
  console.log("user jwt: ", jwt);
  res.json({ jwt });
});

export const handler = serverlessExpress({ app: dynamicApp })
