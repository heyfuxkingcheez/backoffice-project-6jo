import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/signup", userController.signup); //회원가입

export { userRouter };
