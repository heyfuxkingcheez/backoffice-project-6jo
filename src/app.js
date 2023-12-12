import express from "express";
import { configDotenv } from "dotenv";
import router from "./routers/index.js";

configDotenv();

const app = express();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`SERVER ON`, Number(process.env.PORT));
});
