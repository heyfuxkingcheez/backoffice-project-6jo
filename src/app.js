import express from "express";
import { configDotenv } from "dotenv";
import router from "./routers/index.js";
import signupRouter from "./routers/signup.js";

configDotenv();

const app = express();

app.use("/api", signupRouter);

app.listen(process.env.PORT, () => {
  console.log(`SERVER ON`, Number(process.env.PORT));
});
