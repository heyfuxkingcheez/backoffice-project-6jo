import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/signup", usersController.signup); //회원가입

// 유저 정보 조회
usersRouter.get("/info", auth_middleware, usersController.getUser);

export { usersRouter };
