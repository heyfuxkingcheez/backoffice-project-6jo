import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/signup", userController.signup); //회원가입

// authRouter.post("/signin", authController.signin); //로그인

export { userRouter };
