import express from "express";
import { menusRouter } from "./menu.router.js";
import { restaurantsRouter } from "./restaurants.router.js";

const router = express.Router();

router.use("/suragan", restaurantsRouter);
router.use("/suragan/charimpyo", menusRouter);

export default router;
