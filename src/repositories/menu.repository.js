import { prisma } from "../utils/prisma/index.js";

export class MenuRepository {
  // 메뉴 목록 조회
  findAllMenus = async (restaurantId) => {
    const menus = await prisma.menu.findMany({
      where: { RestaurantId: +restaurantId },
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
  isOwner = async (userId) => {
    const isOwner = await prisma.restaurants.findUnique({
      where: { UserId: userId },
    });
    console.log("isOwner: ", isOwner);

    return isOwner;
  };

  createMenu = async (
    category,
    restaurantId,
    name,
    introduce,
    price,
    image
  ) => {
    const createdMenu = await prisma.menu.create({
      data: {
        category,
        RestaurantId: +restaurantId,
        name,
        introduce,
        price,
        image,
      },
    });

    return createdMenu;
  };

  // 메뉴가 사용자의 사업장인지 인증
  findOwnerRestaurant = async (userId) => {
    const isOwner = await prisma.users.findUnique({
      where: { userId },
      include: {
        Restaurants: {
          select: { restaurantId: true },
        },
      },
    });

    return isOwner;
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
