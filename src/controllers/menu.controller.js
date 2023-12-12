import { MenuService } from "../services/menu.service.js";

export class MenuController {
  menuService = new MenuService();
  // 메뉴 목록 조회
  getMenus = async (req, res, next) => {
    try {
      console.log("asd");
      const menus = await this.menuService.findAllMenus();

      return res.status(200).json({
        success: true,
        message: "메뉴 목록 조회 성공!",
        data: menus,
      });
    } catch (err) {
      next(err);
    }
  };

  // 메뉴 등록
  createMenu = async (req, res, next) => {
    try {
      const { category, RestaurantId, name, introduce, price } = await req.body;
      const createdMenu = await this.menuService.createMenu(
        category,
        RestaurantId,
        name,
        introduce,
        price
      );

      return res
        .status(200)
        .json({ success: true, message: "메뉴 등록 성공!", data: createdMenu });
    } catch (err) {
      next(err);
    }
  };
}
