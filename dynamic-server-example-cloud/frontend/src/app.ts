import express from "express";

const staticApp = express();

staticApp.use(express.static("built/public"));

staticApp.listen(3001, () => {
  console.log("Static server is running on http://localhost:3001");
});
