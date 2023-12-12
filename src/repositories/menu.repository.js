import { prisma } from "../utils/prisma/index.js";

export class MenuRepository {
  // 메뉴 목록 조회
  findAllMenus = async () => {
    const menus = await prisma.menu.findMany({
      orderBy: { createdAt: "desc" },
    });

    return menus;
  };

  // 메뉴 상세 조회

  // 메뉴 등록
  createMenu = async (category, RestaurantId, name, introduce, price) => {
    const createdMenu = await prisma.menu.create({
      data: {
        category,
        RestaurantId,
        name,
        introduce,
        price,
      },
    });

    return createdMenu;
  };
}
