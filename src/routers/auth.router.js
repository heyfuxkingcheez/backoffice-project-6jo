import Router from "express";
import { auth_middleware } from "../middlewares/auth.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

// 로그인 API
authRouter.post("/login", authController.LogIn);

// 로그아웃 API
authRouter.get("/logout", auth_middleware, authController.LogOut);

export { authRouter };
