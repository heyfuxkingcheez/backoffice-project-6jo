import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import { configDotenv } from "dotenv";
import router from "./routers/index.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import emailRouter from "./routers/emailtest.router.js";
import { ErrorHandler } from "./middlewares/errorhandler.js";

configDotenv();

const app = express();

app.use(
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser()
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "views")));
app.use("/api", [router, emailRouter]);
app.use(ErrorHandler);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER ON`, Number(process.env.PORT));
});
