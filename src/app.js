import express from "express";
import { configDotenv } from "dotenv";
import router from "./routers/index.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();

app.use(
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser()
);

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`SERVER ON`, Number(process.env.PORT));
});
