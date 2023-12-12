import express from "express";
import { authRouter } from "./auth.router.js";
import { menusRouter } from "./menu.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/suragan/charimpyo", menusRouter);

export default router;
