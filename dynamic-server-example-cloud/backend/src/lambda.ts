import { configure } from "@codegenie/serverless-express";
import { dynamicApp } from "./app.js";

export const handler = configure({ app: dynamicApp });
