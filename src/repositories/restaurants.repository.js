import { prisma } from "../utils/prisma/index.js";

export class RestaurantsRepository {
  // 식당 목록 조회
  findAllRestaurants = async () => {
    const restaurants = await prisma.restaurants.findMany({
      orderBy: { createdAt: "desc" },
    });

    return restaurants;
  };

  // 식당 등록
  createRestaurant = async (
    userId,
    category,
    name,
    address,
    introduce,
    businessHours,
    phoneNumber
  ) => {
    const createdRestaurant = await prisma.restaurants.create({
      data: {
        UserId: userId,
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
}
