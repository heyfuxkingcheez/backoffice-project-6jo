import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  res.json({ message: "Hello World" });
});

export default router;
