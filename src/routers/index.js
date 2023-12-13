import express from "express";
import { authRouter } from "./auth.router.js";
import { menusRouter } from "./menu.router.js";
import { restaurantsRouter } from "./restaurants.router.js";
import { usersRouter } from "./users.router.js";

const router = express.Router();

router.use("/", usersRouter);
router.use("/auth", authRouter);
router.use("/suragan", restaurantsRouter);
router.use("/suragan/charimpyo", menusRouter);

export default router;
