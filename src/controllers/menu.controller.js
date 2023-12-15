import { MenuService } from "../services/menu.service.js";

export class MenuController {
  menuService = new MenuService();

  // 메뉴 목록 조회
  getMenus = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      console.log("restaurantId: ", restaurantId);

      const menus = await this.menuService.findAllMenus(restaurantId);

      return res.status(200).json({
        success: true,
        message: "메뉴 목록 조회 성공!",
        data: menus,
      });
    } catch (err) {
      next(err);
    }
  };

  // 메뉴 상세 조회
  getMenu = async (req, res, next) => {
    try {
      const { menuId } = req.params;
      const menu = await this.menuService.findOneMenu(menuId);

      return res.status(200).json({
        success: true,
        message: "메뉴 상세 조회 성공!",
        data: menu,
      });
    } catch (err) {
      next(err);
    }
  };

  // 메뉴 등록
  createMenu = async (req, res, next) => {
    try {
      const { role } = res.locals.user;
      const { restaurantId } = req.params;
      const { category, name, introduce, price, image } = await req.body;

      const createdMenu = await this.menuService.createMenu(
        category,
        restaurantId,
        name,
        introduce,
        price,
        image,
        role
      );

      return res
        .status(200)
        .json({ success: true, message: "메뉴 등록 성공!", data: createdMenu });
    } catch (err) {
      next(err);
    }
  };

  // 메뉴 수정
  updateMenu = async (req, res, next) => {
    try {
      const { menuId, restaurantId } = req.params;
      const { category, name, introduce, price } = await req.body;
      const { userId } = res.locals.user;

      const updatedMenu = await this.menuService.updateMenu(
        menuId,
        category,
        name,
        introduce,
        price,
        userId,
        restaurantId
      );

      return res.status(200).json({
        success: true,
        message: "메뉴 수정 성공!",
        data: updatedMenu,
      });
    } catch (err) {
      next(err);
    }
  };
  // 메뉴 삭제
  deleteMenu = async (req, res, next) => {
    try {
      const { restaurantId, menuId } = req.params;
      const { userId } = res.locals.user;
      await this.menuService.deleteMenu(restaurantId, menuId, userId);

      return res.status(200).json({
        success: true,
        message: "메뉴 삭제 성공!",
      });
    } catch (err) {
      next(err);
    }
  };
}
