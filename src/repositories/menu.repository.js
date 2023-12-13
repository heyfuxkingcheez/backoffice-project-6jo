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
  findOneMenu = async (menuId) => {
    const menu = await prisma.menu.findUnique({
      where: { menuId: +menuId },
    });

    return menu;
  };

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

  // 메뉴 수정
  updateMenu = async (menuId, category, name, introduce, price) => {
    const updatedMenu = await prisma.menu.update({
      where: { menuId: +menuId },
      data: {
        category,
        name,
        introduce,
        price,
      },
    });
    return updatedMenu;
  };

  // 메뉴 삭제
  deleteMenu = async (menuId) => {
    const deletedMenu = await prisma.menu.delete({
      where: { menuId: +menuId },
    });

    return deletedMenu;
  };
}
