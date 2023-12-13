import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/signup", usersController.signup); //회원가입

usersRouter.post("/signin", usersController.signin); //로그인

export { usersRouter };
