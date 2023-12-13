import { MenuRepository } from "../repositories/menu.repository.js";

export class MenuService {
  menuRepository = new MenuRepository();

  // 메뉴 목록 조회
  findAllMenus = async () => {
    const menus = await this.menuRepository.findAllMenus();
    if (menus.length === 0) throw new Error("메뉴가 없어요");

    return menus.map((menu) => {
      return {
        menuId: menu.menuId,
        category: menu.category,
        name: menu.name,
        price: menu.price,
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
      };
    });
  };

  // 메뉴 상세 조회
  findOneMenu = async (menuId) => {
    const menu = await this.menuRepository.findOneMenu(menuId);
    if (!menu) throw new Error("메뉴가 없어요");

    return {
      menuId: menu.menuId,
      category: menu.category,
      name: menu.name,
      introduce: menu.introduce,
      price: menu.price,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
    };
  };

  // 메뉴 등록
  createMenu = async (category, name, introduce, price) => {
    const createdMenu = await this.menuRepository.createMenu(
      category,
      RestaurantId,
      name,
      introduce,
      price
    );

    return {
      menuId: createdMenu.menuId,
      category: createdMenu.category,
      name: createdMenu.name,
      introduce: createdMenu.introduce,
      price: createdMenu.price,
      createdAt: createdMenu.createdAt,
      updatedAt: createdMenu.updatedAt,
    };
  };

  // 메뉴 수정
  updateMenu = async (menuId, category, name, introduce, price) => {
    const menu = await this.menuRepository.findOneMenu(menuId);
    if (!menu) throw new Error("메뉴가 없어요");
    // if (menu.RestaurantId !== RestaurantId) throw new Error("권한이 없습니다");
    if (menuId) {
      await this.menuRepository.updateMenu(
        menuId,
        category,
        name,
        introduce,
        price
      );
      const updatedMenu = await this.menuRepository.findOneMenu(menuId);
      return {
        menuId: updatedMenu.menuId,
        category: updatedMenu.category,
        name: updatedMenu.name,
        introduce: updatedMenu.introduce,
        price: updatedMenu.price,
        createdAt: updatedMenu.createdAt,
        updatedAt: updatedMenu.updatedAt,
      };
    }
  };

  // 메뉴 삭제
  deleteMenu = async (menuId) => {
    const menu = await this.menuRepository.findOneMenu(menuId);
    if (!menu) throw new Error("메뉴가 없어요");
    // if(menu.RestaurantId !== RestaurantId) throw new Error("권한이 없습니다.")

    await this.menuRepository.deleteMenu(menuId);
  };
}
