import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/signup", usersController.signup); //회원가입

export { usersRouter };
