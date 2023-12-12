import express from "express";
import { menusRouter } from "./menu.router.js";

const router = express.Router();

router.use("/suragan/charimpyo", menusRouter);

export default router;
