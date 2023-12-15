import { prisma } from "../utils/prisma/index.js";

export class RestaurantsRepository {
  // 식당 목록 조회
  findAllRestaurants = async () => {
    const restaurants = await prisma.restaurants.findMany({
      orderBy: { createdAt: "desc" },
    });

    return restaurants;
  };
  // 카테고리별 식당 목록 조회
  findCategoryRestaurants = async (category) => {
    const restaurants = await prisma.restaurants.findMany({
      where: { category: +category },
      orderBy: { createdAt: "desc" },
    });

    return restaurants;
  };

  // 오너 - 식당 상세 조회

  findRestaurantByUserId = async (userId) => {
    const restaurant = await prisma.restaurants.findMany({
      where: { UserId: +userId },
    });
    return restaurant;
  };

  // 식당 등록
  createRestaurant = async (
    userId,
    image,
    category,
    name,
    address,
    introduce,
    businessHours,
    phoneNumber
  ) => {
    console.log("dfdfdfd", name);
    console.log("dfdfdfdfdfdf", image);
    const createdRestaurant = await prisma.restaurants.create({
      data: {
        UserId: userId,
        image,
        category,
        name,
        address,
        introduce,
        businessHours,
        phoneNumber,
      },
    });

    return createdRestaurant;
  };

  // 상세 식당 조회
  findRestaurantById = async (restaurantId) => {
    const restaurant = await prisma.restaurants.findUnique({
      where: { restaurantId: +restaurantId },
    });

    return restaurant;
  };

  // 식당 수정
  updateRestaurant = async (
    restaurantId,
    image,
    category,
    name,
    address,
    introduce,
    businessHours,
    phoneNumber
  ) => {
    const updatedRestaurant = await prisma.restaurants.update({
      where: { restaurantId: +restaurantId },
      data: {
        image,
        category,
        name,
        address,
        introduce,
        businessHours,
        phoneNumber,
      },
    });
    return updatedRestaurant;
  };

  // 식당 삭제
  deleteRestaurant = async (restaurantId) => {
    const deletedRestaurant = await prisma.restaurants.delete({
      where: { restaurantId: +restaurantId },
    });

    return deletedRestaurant;
  };
}
