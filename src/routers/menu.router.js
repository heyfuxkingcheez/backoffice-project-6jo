import { Router } from "express";
import { MenuController } from "../controllers/menu.controller.js";

const menusRouter = Router();
const menusController = new MenuController();

// 메뉴 등록 API
menusRouter.post("/", menusController.createMenu);
// 메뉴 목록 조회 API
menusRouter.get("/", menusController.getMenus);
// 메뉴 상세 조회 API
menusRouter.get("/:menuId", menusController);
// 메뉴 수정 API
menusRouter.put("/:menuId", menusController);
// 메뉴 삭제 API
menusRouter.delete("/:menuId", menusController);

export { menusRouter };
