import express from "express";

const signupRouter = express.Router();

signupRouter.post("/signup", (req, res) => {
  console.log("에옹", req);
});

export default signupRouter;
