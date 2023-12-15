import { Router } from "express";
import { MenuController } from "../controllers/menu.controller.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";
import { auth_owner_middleware } from "../middlewares/auth.owner.middleware.js";

const menusRouter = Router();
const menusController = new MenuController();

// 메뉴 등록 API
menusRouter.post(
  "/:restaurantId/charimpyo",
  auth_middleware,
  auth_owner_middleware,
  menusController.createMenu
);

// 메뉴 목록 조회 API
menusRouter.get("/:restaurantId/charimpyo", menusController.getMenus);
// 메뉴 상세 조회 API
menusRouter.get("/:restaurantId/charimpyo/:menuId", menusController.getMenu);

// 메뉴 수정 API
menusRouter.patch(
  "/:restaurantId/charimpyo/:menuId",
  auth_middleware,
  auth_owner_middleware,
  menusController.updateMenu
);
// 메뉴 삭제 API
menusRouter.delete(
  "/:restaurantId/charimpyo/:menuId",
  auth_middleware,
  auth_owner_middleware,
  menusController.deleteMenu
);

export { menusRouter };
